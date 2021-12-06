var count = 0;
for (var i = 3; i < input.length; i++) {
    if ((input[i] + input[i-1] + input[i-2]) > (input[i-1] + input[i-2] + input[i-3])) {
        count++;
    }
}
console.log(count);