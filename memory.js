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
function GameSquare(el, flag) {
  this.el = el;
  this.isOpen = false;
  this.isLocked = false;
  this.el.addEventListener("click", this, false);
  this.setflag(flag); // Setting the flag.
}


// This method will be called at when an event occurs. 
// In this case when a click happens, it will look if the square is already opened with isOpen = true; or if its locked with || isLocked == true and what is true about both scenarios is that we should ignore the click event. 
// If above is not true we need to mark the clicked square as open and make it "flip" or whatever we want to happen. 
GameSquare.prototype.handleEvent = function (e) {
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
GameSquare.prototype.lock = function () {
  this.isLocked = true;
  this.isOpen = true;
}

// When we reset the game the flags need to be shuffle to new positions. setFlag will assign a new flag to each square. 
GameSquare.prototype.setflag = function (flag) {
  this.el.children[0].children[1].classList.remove(this.flag);
  this.flag = flag;
  this.el.children[0].children[1].classList.add(flag);
}

// Defining an array to hold all the objects inside GameSquare
let gameSquares = [];

// This function will get a reference to the game-square div of all the elements. And make each of them initialize with a DOM element and a flag.
// This is the function to call in the index to start the game.
function setupGame() {
  let array = document.getElementsByClassName("game-square");
  let randomflags = getSomeflags(); // Get array of 8 random flag pairs.
  for (let i = 0; i < array.length; i++) {
    let index = random(randomflags.length); // Get a random index.
    let flag = randomflags.splice(index, 1)[0]; // Get the flag at that index
    gameSquares.push(new GameSquare(array[i], flag));
  }
}
// This function returns a number 0 to n - 1. This is because we need to get "random" items from an array which requires an integer.
function random(n) {
  return Math.floor(Math.random() * n);
}


// The game has 16 squares as required by Elina. This pickout 8 of the random flags that i have set in the CSS, and makes an array with a duplicate of each flag. 
// So this function will return 8 * 2 flags. 
function getSomeflags() {
  let flagscopy = flags.slice();
  // Define a new empty array
  let randomflags = [];
  // Loop 8 times
  for (let i = 0; i < 8; i++) {
    let index = random(flagscopy.splice.length);
    randomflags.push(flagscopy.splice(index, 1)[0]);
  }
  return randomflags.concat(randomflags.slice());
}
// Keep track of the first square clicked.
let firstSquare = null;

// gameSquare as parameter
// First we check if what we click is the first square clicked. And if the firstSquare is set to null which it is, we set firstSquare to gameSquare.
// if firstSquare is not null then we need it to ask if the flag of the firstSquare and gameSquare are a match, and if they match we need to .lock(). And if not a match we need them to close. 
// We are using a setTimeout for the function to add a delay of the execute. 
function checkGame(gameSquare) {
  if (firstSquare === null) {
    firstSquare = gameSquare;
    return
  }

  if (firstSquare.flag === gameSquare.flag) {
    firstSquare.lock();
    gameSquare.lock();
    areOpen = 0;
    firstSquare = null;
  } else {
    let a = firstSquare;
    let b = gameSquare;
    setTimeout(function () {
      a.reset();
      b.reset();
      areOpen = 0;
      firstSquare = null;
    }, 400);
  }

}

// This function assigns new flags on reset. It is looping through all of the game files and pulling a random flag out and settings flags to the squares.
function randomizeflags() {
  let randomflags = getSomeflags();
  gameSquares.forEach(function (gameSquare) {
    let flag = randomflags.splice(random(randomflags.length), 1)[0];
    gameSquare.setflag(flag);
  });
}
// Function to clear the game when all squares are matched.
function clearGame() {
  gameSquares.forEach(function (gameSquare) {
    gameSquare.reset();
  });
  setTimeout(function () {
    randomizeflags();
  }, 500);
  areOpen = 0;
}