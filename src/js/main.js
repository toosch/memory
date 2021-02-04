/**
 * @typedef Card
 */

import Card from "./Card.js";
import emoji from "./all-emoji.js";

// global state object
const state = {
  level: 1,
};

// The parent element of all cards in the game
const gameHolder = document.querySelector("#game");

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// generate a list of emoji in a random order
const generateEmojiList = (nr) => {
  const arr = [];
  while (nr--) {
    let addTwice = randomElement(emoji);
    console.log(addTwice);
    arr.push(addTwice);
    arr.push(addTwice);
  }
  return arr.sort((a, b) => 0.5 - Math.random());
};

let emojiList = generateEmojiList(2);

let cardsList = [];
while (emojiList.length) {
  cardsList.push(new Card(gameHolder, emojiList.pop()));
}

let activeCards = 0;

let previousCard = {
  icon: undefined,
};
document.addEventListener("cardclicked", (e) => {
  activeCards++;
  let currentCard = e.detail;

  // if current and previous match --> matchFound property true
  if (currentCard.icon === previousCard.icon) {
    console.log("same");
    currentCard.matchFound = true;
    previousCard.matchFound = true;
  }

  if (activeCards === 3) {
    console.log(cardsList.filter((card) => card.show === true));
    // hide all cards that have no match
    cardsList
      .filter((card) => card.show === true && card.matchFound === false)
      .forEach((card) => {
        card.hideIcon();
      });
    // except for the last clicked...
    currentCard.showIcon();
    activeCards = 1;
  }

  console.log(activeCards);
  previousCard = e.detail;

  // if all cards flipped => restart game
  if (
    cardsList.filter((card) => card.show === true).length === cardsList.length
  ) {
    console.log("win");
    gameHolder.innerHTML = "";
    console.log(state.level);

    state.level++;
    cardsList = [];
    emojiList = generateEmojiList(state.level * 2);
    while (emojiList.length) {
      cardsList.push(new Card(gameHolder, emojiList.pop()));
    }
    previousCard = {
      icon: undefined,
    };
  }
});
