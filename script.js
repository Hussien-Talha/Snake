// Get the canvas element and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define the grid size and the snake speed
const gridSize = 20;
const snakeSpeed = 200; // Changed from 100 to 200 to make the snake slower

// Define the initial snake position and direction
let snakeX = 200;
let snakeY = 200;
let snakeDX = gridSize;
let snakeDY = 0;

// Define the initial snake body and length
let snakeBody = [];
let snakeLength = 2; // Changed from 4 to 2 to make the snake start with only two blocks

// Define the initial food position
let foodX = 300;
let foodY = 300;

// Define a function to draw the snake
function drawSnake() {
  // Loop through the snake body array and draw each segment
  for (let i = 0; i < snakeBody.length; i++) {
    // Set the snake color and fill style
    ctx.fillStyle = "lime";
    ctx.fillRect(snakeBody[i].x, snakeBody[i].y, gridSize, gridSize);
  }
}

// Define a function to draw the food
function drawFood() {
  // Set the food color and fill style
  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, gridSize, gridSize);
}

// Define a function to update the game state
function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update the snake position
  snakeX += snakeDX;
  snakeY += snakeDY;

  // Check if the snake hit the walls of the canvas
  if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
    // Reset the game state
    snakeX = 200;
    snakeY = 200;
    snakeDX = gridSize;
    snakeDY = 0;
    snakeBody = [];
    snakeLength = 2;
    foodX = 300;
    foodY = 300;
    // Alert the game over message
    alert("Game Over!");
    return; // Added a return statement to stop the update function
  }

  // Add the new snake head to the snake body array
  snakeBody.unshift({ x: snakeX, y: snakeY });

  // Remove the snake tail if the snake is longer than its length
  if (snakeBody.length > snakeLength) {
    snakeBody.pop();
  }

  // Draw the snake and the food
  drawSnake();
  drawFood();

  // Check if the snake ate the food
  if (snakeX === foodX && snakeY === foodY) {
    // Increase the snake length
    snakeLength++;

    // Generate a new random food position
    foodX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    foodY = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
  }

  // Check if the snake hit its own body
  for (let i = 1; i < snakeBody.length; i++) {
    // If the snake head is on the same position as any body segment
    if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
      // Reset the game state
      snakeX = 200;
      snakeY = 200;
      snakeDX = gridSize;
      snakeDY = 0;
      snakeBody = [];
      snakeLength = 2;
      foodX = 300;
      foodY = 300;
      // Alert the game over message
      alert("Game Over!");
      return; // Added a return statement to stop the update function
    }
  }
}

// Define a function to handle the keyboard input
function handleInput(event) {
  // Get the key code of the pressed key
  let key = event.keyCode;

  // Change the snake direction based on the arrow keys
  // Prevent the snake from reversing on itself
  if (key === 37 && snakeDX === 0) {
    // Left arrow key
    snakeDX = -gridSize;
    snakeDY = 0;
  } else if (key === 38 && snakeDY === 0) {
    // Up arrow key
    snakeDY = -gridSize;
    snakeDX = 0;
  } else if (key === 39 && snakeDX === 0) {
    // Right arrow key
    snakeDX = gridSize;
    snakeDY = 0;
  } else if (key === 40 && snakeDY === 0) {
    // Down arrow key
    snakeDY = gridSize;
    snakeDX = 0;
  }
}

// Add an event listener for the keydown event
document.addEventListener("keydown", handleInput);

// Call the update function every snakeSpeed milliseconds
setInterval(update, snakeSpeed);

// ... (existing code)

// Define variables to store touch coordinates
let touchStartX;
let touchStartY;

// Add touch event listeners
canvas.addEventListener("touchstart", handleTouchStart);
canvas.addEventListener("touchmove", handleTouchMove);

// Define functions to handle touch events
function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  if (!touchStartX || !touchStartY) {
    return;
  }

  let touchEndX = event.touches[0].clientX;
  let touchEndY = event.touches[0].clientY;

  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;

  // Determine the swipe direction
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    snakeDX = deltaX > 0 ? gridSize : -gridSize;
    snakeDY = 0;
  } else {
    // Vertical swipe
    snakeDY = deltaY > 0 ? gridSize : -gridSize;
    snakeDX = 0;
  }

  // Reset touch coordinates
  touchStartX = null;
  touchStartY = null;
}

// ... (existing code)