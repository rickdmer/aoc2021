const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim().split('\n');

let numbers = input[0].split(',');

let boardsLines = input.slice(2).map((value) => value.split(/(\s+)/).filter( e => e.trim().length > 0));
let boards = [[]];
let boardIndex = 0;
let winningBoards = [];
let calledNumbers;

for (let i = 0; i < boardsLines.length; i++) {
    if (boardsLines[i].length === 0) {
        boards.push([]);
        boardIndex++;
    } else {
        boards[boardIndex].push(boardsLines[i]);
    }    
}

// iterate over each called number and check for winners
for (let i = 5; i <= numbers.length && winningBoards.length < boards.length; i++) {
    calledNumbers = numbers.slice(0, i);
    checkBoardsForWinners(calledNumbers);
    console.log(i);
}

findUnmarked(boards[winningBoards[winningBoards.length-1]], calledNumbers);

function checkBoardsForWinners(calledNumbers) {
    for (let i = 0; i < boards.length; i++) {
        if (winningBoards.indexOf(i) === -1) {
            if (checkBoardForWin(boards[i], calledNumbers)) {
                winningBoards.push(i);
            }
        }
    }
}

function checkBoardForWin(rows, calledNumbers) {
    // Check rows for win
    for (let i = 0; i < rows.length; i++) {
        if (checkLineForWin(rows[i], calledNumbers)) {
            return true;
        }
    }

    let cols = rows.map((val, colIndex) => rows.map(row => row[colIndex]));
    for (let i = 0; i < cols.length; i++) {
        if (checkLineForWin(cols[i], calledNumbers)) {
            return true;
        }
    }
    return false;
}

function checkLineForWin(line, calledNumbers) {
    for (let i = 0; i < line.length; i++) {
        if (calledNumbers.indexOf(line[i]) === -1) {
            return false;
        }
    }
    return true;
}

function findUnmarked(lines, calledNumbers) {
    let boardNumbers = [].concat(...lines);
    let unmarkedNumbers = boardNumbers.filter(value => calledNumbers.indexOf(value) === -1);
    console.log(unmarkedNumbers.reduce((p, c) => parseInt(p) + parseInt(c)) * calledNumbers[calledNumbers.length-1]);
}