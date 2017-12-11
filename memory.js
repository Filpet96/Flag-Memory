// DOM element Reset button using ID to ALWAYS return a SINGLE element.
let resetButton = document.getElementById("reset-button");

// This assign class names called square- and a number that starts with 1 so etc.. the first will be called square-1.
let flags = [];
for (let i = 0; i < 10; i++) {
    flags.push('square-' + i);
}