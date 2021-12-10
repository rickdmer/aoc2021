const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

const startTags = ['(', '[', '{', '<'];
const endTags = [')', ']', '}', '>'];
const pointsArray = [3, 57, 1197, 25137];

let points = 0;
for (let i = 0; i < input.length; i++) {
    let value = input[i];
    let start = [];
    let line = value.split('');
    for (let j = 0; j < line.length; j++) {
        let char = line[j];
        // end tag
        if (startTags.indexOf(char) === -1) {
            if (start.lastIndexOf(startTags[endTags.indexOf(char)]) !== start.length - 1) {
                // invalid end tag
                points += pointsArray[endTags.indexOf(char)];
                console.log('invalid character: ' + char);
                j = Infinity;
            } else {
                // start tag found, remove the start tag
                start.splice(start.lastIndexOf(startTags[endTags.indexOf(char)]), 1);
            }
        } else {
            // start tag
            start.push(char);
        }
    }
}
console.log(points);