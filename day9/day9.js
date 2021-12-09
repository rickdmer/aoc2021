const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

const grid = input.map(value => value.split('').map(value => parseInt(value)));
const gridHeight = grid.length;
const gridWidth = grid[0].length;

let riskLevel = 0;

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        let xy = grid[y][x];
        let lowPoint = true;
        // check top, left, right, bottom
        let cross = [[0, -1], [-1, 0], [1, 0], [0, 1]];

        cross.forEach(direction => {
            if (x+direction[0] >= 0 && x+direction[0] < gridWidth && y+direction[1] >= 0 && y+direction[1] < gridHeight) {
                // check direction
                if (xy >= grid[y+direction[1]][x+direction[0]]) {
                    lowPoint = false;
                }
            }
        });
        
        if (lowPoint) {
            riskLevel += xy+1;
        }

    }
}

console.log(riskLevel);
