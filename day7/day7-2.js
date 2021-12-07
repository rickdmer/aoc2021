const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim().split('\n')[0].split(',').map(value => parseInt(value));

function getFuelUse(distance) {
    let fuel = 0;
    let a = 1;
    for (let i = 0; i < distance; i++) {
        fuel += a;
        a++;
    }
    return fuel;
}

let start = 0;
let lastGas = Infinity;
while (true) {
    let totalGas = input.reduce((total, currentValue) => {
        return total + getFuelUse(Math.abs(currentValue - start));
    }, 0);
    if (totalGas < lastGas) {
        lastGas = totalGas;
        start++;
    } else {
        console.log(start-1);
        console.log(lastGas);
        break;
    }
}

