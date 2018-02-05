/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function toggleCard(card) {
  card.classList.toggle("open");
  card.classList.toggle("show");
}

function checkForMatch() {
  // if the cards do match, lock the cards in the open position and increment the matches count
  if (openCards[0].querySelector("i").classList[1] ===
    openCards[1].querySelector("i").classList[1]) {
    for (card of openCards) {
      card.classList.add("match");
      matches++;
    }
  }
  // if the cards do not match, hide the card's symbol
  else {
    for (card of openCards) {
      toggleCard(card);
    }
  }

  // remove the cards from the list of open cards
  openCards = [];

  // increment the move counter and display it on the page
  moves++;
  document.querySelector(".moves").textContent = moves;

  // TODO: if all cards have matched, display a message with the final score
  if (matches === 16) {
    console.log("game over");
  }
}

let openCards = [], matchedCards = [], moves = 0, matches = 0;
const deck = document.querySelector(".deck");
deck.addEventListener("click", function(e) {
  if (e.target.classList.contains("card")) {
     const card = e.target;

     // Display the card's symbol
     toggleCard(card);

     // Add the card to a *list* of "open" cards
     openCards.push(card);

     // If the list already has another card, check to see if the two cards match
     if (openCards.length === 2) {
       setTimeout(function() {
         checkForMatch();
       }, 600);
     }
 }
});
