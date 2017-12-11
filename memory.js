let areOpen = 0;
// DOM element Reset button using ID to ALWAYS return a SINGLE element.
let resetButton = document.getElementById("reset-button");

// This assign class names called square- and a number that starts with 1 so etc.. the first will be called square-1.
let flags = [];
for (let i = 0; i < 10; i++) {
    flags.push('square-' + i);
}
// This is add clicks to the memory squares, and also to keep track of what state each memory square is.
// The different states the squares can be in is open, closed, locked, unlocked.
// Open or closed is if the squares default state is visible or if a user has clicked on it and the content is displayed.
// Locked or unlocked means that either the square is locked and a user has matched it and then we want to ignore anymore clicks on that, unlocks ofcourse means the opposite ( no match).
function GameSquare(el, flag){
    this.el = el;
    this.isOpen = false;
    this.isLocked = false;
    this.el.addEventListener("click", this, false);
    this.setflag(flag); // Setting the flag.
}