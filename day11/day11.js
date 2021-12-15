const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

let grid = input.map(value => value.split('').map(value => parseInt(value)));
let adjacent = [[-1,-1],[-1, 0],[-1,1],[0,1],[1,1],[1, 0],[1,-1],[0,-1]];
let flashes = 0;

// 100 times
for (let count = 0; count < 100; count++) {
    // increase energy of each by 1
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            grid[y][x]++;
        }
    }
    
    // any octopus with an energy level greater than 9 flashes
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] > 9) {
                flash(x, y);
            }
        }
    }
}


function flash(x, y) {
    // any octopus that flashes gets its energy level set to 0
    flashes++;
    grid[y][x] = 0;

    // increase the energy level of all adjacent octopuses by 1
    adjacent.forEach(value => {
        if (typeof grid[y+value[0]] === 'undefined'
            || typeof grid[y+value[0]][x+value[1]] === 'undefined'
            || grid[y+value[0]][x+value[1]] === 0
            || grid[y+value[0]][x+value[1]] > 9) {
               // do nothing
        } else {
            grid[y+value[0]][x+value[1]]++;
            // if this causes an octo to have an energy level greater than 9, it also flashes
            if (grid[y+value[0]][x+value[1]] > 9) {
                flash(x+value[1], y+value[0]);
            }
        }
    });
    
}

console.log(flashes);