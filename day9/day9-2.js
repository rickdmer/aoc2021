const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

let grid = input.map(value => value.split('').map(value => parseInt(value)));

function floodFill(node, total) {
    if (typeof grid[node[0]] === 'undefined' || typeof grid[node[0]][node[1]] === 'undefined' || grid[node[0]][node[1]] === 9) {
        return total;
    }
    grid[node[0]][node[1]] = 9; // fill
    total = floodFill([node[0]+1, node[1]], total); // look down
    total = floodFill([node[0]-1, node[1]], total); // look up
    total = floodFill([node[0], node[1]-1], total); // look left
    total = floodFill([node[0], node[1]+1], total); // look right
    return total + 1;
}

let basins = [];
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        let node = grid[y][x];
        if (node !== 9) {
            basins.push(floodFill([y,x], 0));
        }
    }
}

basins.sort((a, b) => b - a);
console.log(basins.slice(0, 3).reduce((total, value) => total * value));