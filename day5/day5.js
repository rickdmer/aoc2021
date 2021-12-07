const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim().split('\n');

const Line = function(x1, y1, x2, y2) {
    this.x1 = parseInt(x1);
    this.y1 = parseInt(y1);
    this.x2 = parseInt(x2);
    this.y2 = parseInt(y2);
}
Line.prototype.isValid = function() {
    if (this.x1 === this.x2 || this.y1 === this.y2) {
        return true;
    }
}
Line.prototype.getNormalLine = function() {
    if (this.x2 < this.x1 || this.y2 < this.y1) {
        return {
            x1: this.x2,
            y1: this.y2,
            x2: this.x1,
            y2: this.y1
        };
    } else {
        return {
            x1: this.x1,
            y1: this.y1,
            x2: this.x2,
            y2: this.y2
        };
    }
    
}

let lines = input.map(function(value) {
    value = value.split(' -> ').join(',').split(',');
    let line = new Line(...value);
    if (line.isValid()) {
        return line;
    } else {
        return false;
    }
}).filter(value => value !== false);

const mapSize = lines.reduce(function(final, line) {
    return Math.max(final, line.x1, line.x2, line.y1, line.y2);
}, 0);

const map = Array(mapSize+1).fill().map(() => Array(mapSize+1).fill(0));

lines.forEach(line => {
    let l = line.getNormalLine();
    for (let x = l.x1; x <= l.x2; x++) {
        for (let y = l.y1; y <= l.y2; y++) {
            map[x][y]++;
        }
    }
});

const atLeastTwo = map.reduce((total, currentValue) => total += currentValue.filter(a => a >= 2).length, 0);

console.log(atLeastTwo);