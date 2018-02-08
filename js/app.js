let openCards = [], moveCount = 0, matchCount = 0, starRating = 3, firstCard = true;
let startTime = performance.now(), timer = null;
const deck = document.querySelector(".deck");
const moves = document.querySelector(".moves");
const stars = document.querySelector(".stars");
const timerDisplay = document.querySelector(".timer");
const winModal = $("#win-modal");

// Reset timer
function resetTimer() {
  // Stop timer
  clearInterval(timer);
  timer = null;

  // Set first card to true to trigger timer to restart on card click
  firstCard = true;

  // Reset time display
  timerDisplay.textContent = "0 s";
}

// Start/update timer
function startTimer() {
  // Reset start time
  startTime = performance.now();

  timer = setInterval(function() {
    // Calculate elapsed time since game start in seconds
    const now = performance.now();
    const msElapsedTime = now - startTime;
    const minElapsedTime = Math.floor((msElapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const sElapsedTime = Math.floor((msElapsedTime % (1000 * 60)) / 1000);

    // Set elapsed time in display
    let displayTime = `${sElapsedTime} s`;
    if (minElapsedTime > 0) {
      displayTime = `${minElapsedTime} min ${sElapsedTime} s`;
    }
    timerDisplay.textContent = displayTime;
  }, 1000);
}

// Shuffle cards and reset card class
function shuffleDeck() {
  for (let i = deck.children.length; i >= 0; i--) {
    const newCard = deck.children[Math.random() * i | 0];
    newCard.classList = ["card"];
    deck.appendChild(newCard);
  }
}

// Restart game
function restartGame() {
  // Shuffle the deck
  shuffleDeck();

  // Reset the star rating
  starRating = 3;
  for (let i=0; i<3; i++) {
    resetStar(stars.children[i].querySelector("i"));
  }

  // Reset the move counter
  moveCount = 0;
  moves.textContent = moveCount;

  // Reset the match counter
  matchCount = 0;

  // Reset the timer
  resetTimer();
}

// Set restart button event listener
document.querySelector(".restart").addEventListener("click", function(e) {
  restartGame();
});

// Set play again button event listener
document.querySelector(".play-again").addEventListener("click", function(e) {
  restartGame();
  winModal.modal("hide");
});

// Toggle display on card
function toggleCard(card) {
  card.classList.toggle("open");
  card.classList.toggle("show");
}

// Reset star
function resetStar(star) {
  star.classList.add("fa-star");
  star.classList.remove("fa-star-o");
}

// Remove star
function removeStar(star) {
  star.classList.remove("fa-star");
  star.classList.add("fa-star-o");
  starRating--;
}

function gameWon() {
  // Stop timer
  clearInterval(timer);
  timer = null;

  // show modal with winning stats
  document.querySelector(".stat-time").textContent = timerDisplay.textContent;
  document.querySelector(".stat-moves").textContent = moveCount;
  document.querySelector(".stat-stars").textContent = starRating;
  winModal.modal("show");
}

// Check if open cards match
function checkForMatch() {
  // If the cards do match, lock the cards in the open position and increment the match counter
  if (openCards[0].querySelector("i").classList[1] ===
    openCards[1].querySelector("i").classList[1]) {
    for (card of openCards) {
      card.classList.add("match");
    }
    matchCount++;
  }
  // If the cards don't match, hide the card's symbol
  else {
    for (card of openCards) {
      toggleCard(card);
    }
  }

  // Clear the list of open cards
  openCards = [];

  // Increment the move counter and display it on the page
  moveCount++;
  moves.textContent = moveCount;

  // After 12 moves, star rating decreases to 2
  if (moveCount === 13) {
    removeStar(stars.children[2].querySelector("i"));
  }
  // After 20 moves, star rating decreases to 1
  else if (moveCount === 21) {
    removeStar(stars.children[1].querySelector("i"));
  }

  // If all cards have matched, display modal with final score
  if (matchCount === 8) {
    gameWon();
  }
}

// Set card event listener
deck.addEventListener("click", function(e) {
  if (e.target.classList.contains("card")) {
    // Get selected card
    const card = e.target;

    // Start timer if first card to be opened
    if (firstCard) {
      startTimer();
    }

    // Set first card to false
    firstCard = false;

    // Do nothing if card already open
    if (card.classList.contains("open")) {
      return;
    }

    // Display the card's symbol
    toggleCard(card);

    // Add the card to a list of open cards
    openCards.push(card);

    // If the list already has another card, check to see if the two cards match
    if (openCards.length === 2) {
      setTimeout(function() {
        checkForMatch();
      }, 600);
    }
  }
});
