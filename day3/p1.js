// Create multidimensional array from input
let inputArray = [];
for (let i = 0; i < input.length; i++) {
  inputArray.push(input[i].split(''));
}

let halfInputLength = (inputArray.length / 2);
let counts = new Array(inputArray[0].length).fill(0);
let gamma = '0'.repeat(inputArray[0].length);
let epsilon = '1'.repeat(inputArray[0].length);

// Count 1 and 0 for each position
for (let x = 0; x < inputArray[0].length; x++) {
  for (let y = 0; y < inputArray.length; y++) {
    if (inputArray[y][x] === "1") {
      counts[x] += 1;
      if (counts[x] > halfInputLength) {
        gamma = gamma.substring(0, x) + '1' + gamma.substring(x + 1);
        epsilon = epsilon.substring(0, x) + '0' + epsilon.substring(x + 1);
        break;
      }
    }  
  }
}

console.log(gamma);
console.log(epsilon);
console.log(parseInt(gamma, 2), parseInt(epsilon, 2));
console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));