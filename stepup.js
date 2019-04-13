var x=5;

for(var y=1; y<=4; y++){
    for(var h=10; h<=25; h++){
        var c1 = countSteps1(x,y,h);
        var c2 = countSteps2(x,y,h);
        if(c1 != c2){
            console.log(x + " " + y + " " + h + " " + c1 + " " + c2);
        }
    }
}


function countSteps1(x,y,h){
    var count=0;
    //console.log(x + " " + y + " " + h);
    var curr=0,count=0;
    while(curr<h){
        count++;
        curr += x;
        if(curr>=h) break;
        curr -= y;
    }
    return count;
}

function countSteps2(x,y,h){
    var a=h/(x-y);
    //a=a.toString().split('.')[0];
    a=a.toFixed();
    return a;
}