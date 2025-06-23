// intial variables
let cards = []
let dealerCards = []
let sum = 0
let dealerSum = 0
let hasBlackjack = false
let inGame = false
let message = ""

// elements we change
const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const dealerSumEl = document.getElementById("dealerSum-el")
const dealerCardsEl = document.getElementById("dealerCards-el")
const hitEl = document.getElementById("hit-btn")
const standEl = document.getElementById("stand-btn")
const playAgainEl = document.getElementById("playAgain-btn")

// responsible for displaying cards for either user or dealer
function displayCards(cards, element, label) {
  element.textContent = label + ": "
  for (let i = 0; i < cards.length; i++) {
    element.textContent += cards[i] + " "
  }
}

// resets board and allows user to play again
function playAgain() {
  // reset all variables 
  playAgainEl.style.display = "none"
  cards = []
  dealerCards = []
  sum = 0
  dealerSum = 0
  hasBlackjack = false
  inGame = true
  // start the game after reset
  startGame()
}

// first go in the game
function startGame() {
  // intializes users starting cards
  inGame = true
  let firstCard = getRandomCard()
  let secondCard = getRandomCard()
  cards.push(firstCard, secondCard)
  sum = firstCard + secondCard

  // intializes dealers cards
  let firstDealerCard = getRandomCard()
  let secondDealerCard = getRandomCard()
  dealerCards.push(firstDealerCard, secondDealerCard)
  dealerSum = firstDealerCard + secondDealerCard
  // procees with game
  renderGame()
}

// resposible for the main function fo the game. (updates)
function renderGame() {

  // get rid of start button when user starts game
  document.getElementById("start-btn").style.display = "none"
  
  // shows updates sum
  sumEl.textContent = "Sum: " + sum

  // displays users cards
  displayCards(cards, cardsEl, "Cards")

  //displays dealers second card as follows with the rules of blackjack
  dealerCardsEl.textContent = "Dealer: " + "? " + dealerCards[1]

  // shows dealers sum (anonymous)
  dealerSumEl.textContent = "Dealer Sum: ?"

  // if statements to ensure all cases of blackjack are met.
  if (sum <= 20) {
    message = "Do you want to draw a new card?"
    hitEl.style.display = "inline-block"
    standEl.style.display = "inline-block"
} 
else if (sum === 21) {
  hasBlackjack = true
  message = "Woohoo! You've got blackjack!"
  hitEl.style.display = "none"
  standEl.style.display = "none"
  playAgainEl.style.display = "inline-block"
} 
else {
  inGame = false
  message = "BUST!"
  hitEl.style.display = "none"
  standEl.style.display = "none"
  playAgainEl.style.display = "inline-block"
}

// shows the user the message based on win/loss/choice
messageEl.textContent = message
}

// responsible for when user chooses to add another card/hit
function hit() {

  // ensure hitting is possible
  if (inGame && !hasBlackjack) {

    // updates game based on hit in blackjack and adds card to array
    let newCard = getRandomCard()
    sum += newCard
    cards.push(newCard)
    
    //proceeds with game
    renderGame()
  }

  
}
// responsible for when uses to stand (not pick another card and see how the game proceeds)
function stand() {

  // hide the hit and stand buttons as game will flow with dealer based win/loss/tie
  hitEl.style.display = "none"
  standEl.style.display = "none"

  // ensures standing is possible
  if (inGame && !hasBlackjack) {

    // blackjack game logic for when dealer does not have 17 and less
    while (dealerSum<17) {
      let dealerNextCard = getRandomCard()
      dealerCards.push(dealerNextCard)
      dealerSum +=dealerNextCard

      //displays dealers cards
      displayCards(dealerCards, dealerCardsEl, "Dealer")

      // updates dealers sum
      dealerSumEl.textContent = "Dealer Sum: " + dealerSum
    }

    //displays dealers cards
    displayCards(dealerCards, dealerCardsEl, "Dealer")

      // updates dealers sum
      dealerSumEl.textContent = "Dealer Sum: " + dealerSum

    // if statements for determine if user wins/loses/ties for when they stand
    if (dealerSum>21 || sum>dealerSum) {
      message = "You win!"
    } 
    else if (sum<dealerSum) {
      message = "You lost, house wins"
    } 
    else {
      message = "Tie!"
    }

    // shows user the message based on win/lose/tie
    messageEl.textContent = message
    // reveal play again button
    playAgainEl.style.display = "inline-block"
  }


}

// resposible for return random card(number between 2-11)
function getRandomCard() {
  return Math.floor(Math.random() * (11-2+1)) + 2
}