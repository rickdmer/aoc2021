// Create multidimensional array from input
let inputArray = [];
for (let i = 0; i < input.length; i++) {
  inputArray.push(input[i].split(''));
}

let mostCommon;

// copy input array for starting point
let oxyArray = inputArray.slice(0);
let co2Array = inputArray.slice(0);

// Get the most common bit in a specified position from a given array
function getMostCommonValue(array, index, favorValue) {
  let halfArrayLength = (array.length / 2);
  let count = 0;

  for (let y = 0; y < array.length; y++) {
    if (array[y][index] === "1") {
      count += 1;      
    }
  }
  console.log('count: ' + count);
  if (count >= halfArrayLength) {
    return "1";
  } else {
    return "0";
  }
}

for (let x = 0; x < oxyArray[0].length; x++) {
  mostCommon = getMostCommonValue(oxyArray, x, "1");
  for (let y = oxyArray.length-1; y > -1 && oxyArray.length !== 1; y--) {
    // if the bit is not the most common, remove it
    if (oxyArray[y][x] !== mostCommon) {
      oxyArray.splice(y, 1);
    }
  }
}
let oxyRating = oxyArray[0].join('');
console.log(oxyRating);

for (let x = 0; x < co2Array[0].length; x++) {
  let mostCommon = getMostCommonValue(co2Array, x, "0");
  for (let y = co2Array.length-1; y > -1 && co2Array.length !== 1; y--) {
    // if the bit is the most common, remove it
    if (co2Array[y][x] === mostCommon) {
      co2Array.splice(y, 1);
    }
  }
}
let co2Rating = co2Array[0].join('');
console.log(co2Rating);

console.log(parseInt(oxyRating, 2) * parseInt(co2Rating, 2));