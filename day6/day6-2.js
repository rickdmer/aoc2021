const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim().split('\n')[0].split(',').map(value => parseInt(value));

const fishCount = Array(10).fill(0);
input.forEach(fish => {
    fishCount[fish]++;
});

for (let d = 0; d < 256; d++) {
    const fishAt0 = fishCount[0];
    for (let i = 0; i <= 8; i++) {
        fishCount[i] = fishCount[i + 1];
    }
    fishCount[8] = fishAt0;
    fishCount[6] += fishAt0;
}

console.log(fishCount.reduce((total, currentValue) => total + currentValue));