/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    let counter = 0;
    for(let x=0; x<grid.length; ++x){
        for(let y=0; y<grid[x].length; ++y){
            if(grid[x][y]==1){
                ++counter;
                explore(grid,x,y);
                
            }
        }
        
    }  
    return counter;
};

function explore(grid, x, y){
    // check boundaries
    //console.log(x,y);
    
    if(x<0 || x>=grid.length){
        return;
    }
    if(y<0 || y>=grid[x].length){
        return;
    }
    
    if(grid[x][y]==0){
        return;
    }
    else{
        grid[x][y]=0;
        explore(grid, x+1, y  );
        explore(grid, x-1, y  );
        explore(grid, x,   y+1);
        explore(grid, x,   y-1);
    }
}