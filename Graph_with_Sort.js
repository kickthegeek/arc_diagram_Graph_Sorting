// N x N matrice for the number of nodes
T0 = {
   "v0" : [[1,1,1,0,0,0],0],
   "v2" : [[1,1,1,0,1,1],0],
   "v4" : [[0,0,1,0,1,0],0],
   "v5" : [[0,0,1,0,0,1],0],
   "v3" : [[0,1,0,1,0,0],0],
   "v1" : [[1,1,1,1,0,0],0],
};

num_nodes= 6;
console.log(T0);

function calculate_distances(T) {
    d = [];
    for (const node in T){
       // console.log(T[node][0]);
        S = 0;
        N = 0;
        obj = T[node][0];
        for (const index in obj){
            if(obj[index] != 0 ){
                S+=Object.values(T).indexOf(T0["v"+index]);
                //console.log("indexes ",index);
                N+=1;
            }
        }
      //  console.log("S",S,"N",N);
        S/=parseFloat(N);
        T[node][1] = S;        
    }
   return T;
}

function sort(T){
     //sorting object
     SortedT = Object.keys(T).sort(function(a,b){return T[a][1]-T[b][1]});
     SortedV = Object.keys(T).sort(function(a,b){return T[a][1]-T[b][1]}).map(key=>T[key]);
     //console.log(SortedT);
     //console.log(SortedV);
     var result = {};
     SortedT.forEach((key, i) => result[key] = SortedV[i]);
     console.log(result);
     return result;
}

function draw(T){
    //draw 
    ctx.clearRect(0, 0, c.width, c.height);
    //draw all elements
    distances =  Object.keys(T).map(key=>T[key][1]);
    keys = Object.keys(T).map(x => x);
    poses= {};
    position = 100;
    d = 50;
    keys.forEach(item =>{
      // console.log(item);
      poses[item] = position;
      position+=d ;});
    keys.forEach(node =>{
      // console.log(item);
      write_name(node, poses[node]); 
      neighbors = T[node][0];
      console.log(node);
      console.log("NEIGHBORS");
      console.log(neighbors);
      neighbors.forEach((neighbor,index) => {
        //getting neighbors 
        if(neighbor !=0){
        node1_pose = poses[node];
        node2_pose = poses["v"+index];
        console.log("node "+node, node1_pose,"v"+index, node2_pose);
        center = (node1_pose+node2_pose)/2;
        distance = Math.abs(node1_pose-node2_pose)/2;
        ctx.beginPath();
        ctx.arc(center, 150, distance, Math.PI, 2 *Math.PI);
        ctx.stroke();
        }
        
      });
    });
    
    //draw the arcs depending on the connection
}
function write_name(txt,pos){
    ctx.font = "10px Arial";
    ctx.fillText(txt, pos, 160);
}
function write_distance(txt,pos){
    ctx.font = "10px Arial";
    ctx.fillText(txt, pos, 170);
    
}

//algorithme 
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


// dessiner T0
T0 = calculate_distances(T0);
draw(T0);



T1 = sort(T0);
T1 = calculate_distances(T1);
T2 = sort(T1);
T2= calculate_distances(T2);
T3 = sort(T2);


