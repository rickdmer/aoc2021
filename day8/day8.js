const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');
const outputs = input.map(value => value.split(' | ')[1]);

var sum = outputs.reduce((sum, outputLine) => sum + parseInt(outputLine.split(' ').filter(outputVal => [2, 4, 3, 7].indexOf(outputVal.length) !== -1).length ), 0);
console.log(sum);
