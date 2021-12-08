const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

const normalPattern = ['abcefg', 'cf', 'acdeg', 'acdfg', 'bdcf', 'abdfg', 'abdefg', 'acf', 'abcdefg', 'abcdfg'];
const countLegend = Array(10).fill(0).map(x => []);

// for each normal pattern, figure out how many segments are shared with the others
normalPattern.forEach((normalValue, index) => {
    normalPattern.forEach(compare => {
        let sharedLetters = normalValue.split('').filter(letter => compare.split('').indexOf(letter) !== -1).length;
        countLegend[index].push(sharedLetters);
    });
});

// an array of the number of segments for each number
const segNums = countLegend[8];

function getMatchedLetters(s1, s2) {
    let count = 0;
    for (let i in s1) {
        s2.includes(s1[i]) ? count++ : false;
    }
    return count;
}

function alphabetize(str) {
    return str.split('').sort().join('');
}

let solution = 0;
input.forEach((value) => {
    const signal = value.split(' | ')[0];
    const output = value.split(' | ')[1];

    let key = Array(10);
    let knownNumbers = [];

    // first find 1, 4, 7, and 8 as these are unique
    signal.split(' ').forEach((value) => {        
        if ([2, 3, 4, 7].indexOf(value.length) !== -1) {
            // store value alphabetically
            key[segNums.indexOf(value.length)] = alphabetize(value);
            knownNumbers.push(segNums.indexOf(value.length));
        }
    });

    // find the rest
    signal.split(' ').forEach((value) => {
        for (let i = 0; i < 10; i++) {

            // skip found numbers
            if (key[i]) continue;

            let match = true;

            // if the length matches this number
            match = value.length !== countLegend[i][i] ? false : match;

            // if the number matches the legend for every known number
            knownNumbers.forEach(knownNumber => {
                match = getMatchedLetters(value, key[knownNumber]) !== countLegend[i][knownNumber] ? false : match;
            });

            if (match) {
                key[i] = alphabetize(value);
                knownNumbers.push(i);
            }
        }
    });

    // get the decoded total as 4 character string
    let decodedTotal = output.split(' ').reduce((total, value) => total + key.indexOf(alphabetize(value)), '');

    // sumbitch
    solution += parseInt(decodedTotal);

});

console.log(solution);