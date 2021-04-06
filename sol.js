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
// console.log(T0);

function calculate_distances(T) {
    d = [];
    for (const node in T){
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
     //sorting object
     SortedT = Object.keys(T).sort(function(a,b){return T[a][1]-T[b][1]});
     SortedV = Object.keys(T).sort(function(a,b){return T[a][1]-T[b][1]}).map(key=>T[key]);
     var result = {};
     SortedT.forEach((key, i) => result[key] = SortedV[i]);
     console.log(result);
     return result;
}

// function sort(T){
//      //sorting object
//      SortedT = Object.keys(T).sort(function(a,b){return T[a][1]-T[b][1]});
//      SortedV = Object.keys(T).sort(function(a,b){return T[a][1]-T[b][1]}).map(key=>T[key]);
//      //console.log(SortedT);
//      //console.log(SortedV);
//      var result = {};
//      SortedT.forEach((key, i) => result[key] = SortedV[i]);
//      console.log(result);
//      return result;
// }

function draw(T){
    //draw 
    ctx.clearRect(0, 0, c.width, c.height);
    //draw all elements
    distances =  Object.keys(T).map(key=>T[key][1]);
    keys = Object.keys(T).map(x => x);
    poses= {};
    position = 100;
    d = 100;
    keys.forEach(item =>{
      poses[item] = position;
      position+=d ;});
    keys.forEach(node =>{
      write_name(node, poses[node]); 
      write_distance(T[node][1], poses[node]); 
      neighbors = T[node][0];
      neighbors.forEach((neighbor,index) => {
        //getting neighbors 
        if(neighbor !=0){
        node1_pose = poses[node];
        node2_pose = poses["v"+index];
        center = (node1_pose+node2_pose)/2;
        distance = Math.abs(node1_pose-node2_pose)/2;
        ctx.beginPath();
        ctx.arc(center, 180, distance, Math.PI, 2 *Math.PI);
        ctx.stroke();
        }
        
      });
    });
    
    //draw the arcs depending on the connection
}
function write_name(txt,pos){
    ctx.font = "20px Arial";
    ctx.fillText(txt, pos - 10, 200);
}
function write_distance(txt,pos){
    ctx.font = "20px Arial";
    ctx.fillText("d="+txt, pos-10 , 220);
    
}
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

//algorithme 
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
hist_index = 0;
history = {};
history['T0'] = T0;
T1 = calculate_distances(T0);
history['T1'] = T1;
i = 1 ; 
while(true){
  i+=1;
  console.log("iteration " + i);
  hist_index = i;
  T2 = calculate_distances(T1);
  draw(T2); 
  
  if (JSON.stringify(T2) === JSON.stringify(T1) )
    break;
  T1 = Object.assign(T2, T1);; 
  history["T"+i] = Object.assign({}, T1);
 
}
title = document.getElementById("title");
title.textContent = "T"+hist_index;


function back(){
  if(hist_index > 0 )
     hist_index--;
  title = document.getElementById("title");
  title.textContent = "T"+hist_index;
  
  draw(history["T"+hist_index]);

}
function forth(){
  if(hist_index < i-1 )
    hist_index++;
    title = document.getElementById("title");
  title.textContent = "T"+hist_index;
  
  draw(history["T"+hist_index]);
 
}
