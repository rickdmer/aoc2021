const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim().split('\n')[0].split(',').map(value => parseInt(value));
console.log(input);

for (let d = 0; d < 80; d++) {
    for (let i = 0; i < input.length; i++) {
        if (input[i] == 0) {
            input.push(9);
            input[i] = 7;
        }
        input[i]--;
    }
}

console.log(input.length);