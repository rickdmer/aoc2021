const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

const startTags = ['(', '[', '{', '<'];
const endTags = [')', ']', '}', '>'];

let p2Points = [];
for (let i = input.length-1; i >= 0; i--) {
    let value = input[i];
    let start = [];
    let line = value.split('');
    for (let j = 0; j < line.length; j++) {
        let char = line[j];
        // end tag
        if (startTags.indexOf(char) === -1) {
            if (start.lastIndexOf(startTags[endTags.indexOf(char)]) !== start.length - 1) {
                // invalid end tag
                j = Infinity;
                // remove invalid line
                input.splice(i, 1);
                continue;
            } else {
                // start tag found, remove the start tag
                start.splice(start.lastIndexOf(startTags[endTags.indexOf(char)]), 1);
            }
        } else {
            // start tag
            start.push(char);
        }

        // if we're at the end, complete the tags
        if (j === line.length - 1) {
            p2Points.push(start.reverse().reduce((total, value) => { 
                return total * 5 + startTags.indexOf(value)+1;
            }, 0));
        }

    }
}

console.log(p2Points.sort((a,b) => a - b)[Math.floor(p2Points.length/2)]);