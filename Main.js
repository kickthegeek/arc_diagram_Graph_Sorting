// N x N matrice for the number of nodes
T0 = {
   "v0" : [[1,1,1,0,0,0],0],
   "v2" : [[1,1,1,0,1,1],0],
   "v4" : [[0,0,1,0,1,0],0],
   "v5" : [[0,0,1,0,0,1],0],
   "v3" : [[0,1,0,1,0,0],0],
   "v1" : [[1,1,1,1,0,0],0],
};

console.log(T0);

function calculate_distances(T) {
    d = [];
    for (const node in T){
        console.log(T[node][0]);
        S = 0;
        N = 0;
        obj = T[node][0];
        for (const index in obj){
            if(obj[index] != 0 ){
                S+=Object.values(T).indexOf(T0["v"+index]);
                console.log("indexes ",index);
                N+=1;
            }
        }
        console.log("S",S,"N",N);
        S/=parseFloat(N);
        T[node][1] = S;
        
    }
    //sorting object
    nextT = {};
    SortedT = Object.keys(T).sort(function(a,b){return T[a][1]-T[b][1]});
    SortedV = Object.keys(T).sort(function(a,b){return T[a][1]-T[b][1]}).map(key=>T[key]);
    //console.log(SortedT);
    //console.log(SortedV);
    var result = {};
    SortedT.forEach((key, i) => result[key] = SortedV[i]);
    console.log(result);
    return result;
}

T1 = calculate_distances(T0);
T2 = calculate_distances(T1);
T3= calculate_distances(T2);
