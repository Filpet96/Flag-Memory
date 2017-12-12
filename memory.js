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
// This method will be called at when an event occurs. 
// In this case when a click happens, it will look if the square is already opened with isOpen = true; or if its locked with || isLocked == true and what is true about both scenarios is that we should ignore the click event. 
// If above is not true we need to mark the clicked square as open and make it "flip" or whatever we want to happen. 
GameSquare.prototype.handleEvent = function(e) {
    switch (e.type) {
      case "click":
        if (this.isOpen || this.isLocked || areOpen == 2) {
          return;
        }
        areOpen += 1;
        this.isOpen = true;
        this.el.classList.add('flip');
        checkGame(this); // checking the game
    }
  }
  // This step is to set the el ( game square) to false in both open and locked state and also remove the flip class. This step is crucial in the case where there is not a match you need the squares to flip back to default.
GameSquare.prototype.reset = function () {
  this.isOpen = false;
  this.isLocked = false;
  this.el.classList.remove('flip');
}

// This is to lock in matched squares. This is why we set both isLocked and IsOpen to true. This will ensure that they are not getting flipped back to default or can be clicked anymore. 
GameSquare.prototype.lock = function() {
  this.isLocked = true;
  this.isOpen = true;
}

// When we reset the game the flags need to be shuffle to new positions. setFlag will assign a new flag to each square. 
GameSquare.prototype.setflag = function(flag) {
  this.el.children[0].children[1].classList.remove(this.flag);
  this.flag = flag;
  this.el.children[0].children[1].classList.add(flag);
}