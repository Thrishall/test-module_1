// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");
const btnNext = document.querySelector(".next-btn");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");


const scoreNumber = document.querySelector(".score__number");
const scoreNumber1 = document.querySelector(".score__number1");

// Load scores from localStorage or initialize to 0
let score1 = localStorage.getItem('score1') ? parseInt(localStorage.getItem('score1')) : 0;
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;

// Update the displayed scores
scoreNumber.innerText = score;
scoreNumber1.innerText = score1;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const pcchoice = pcChoose();
  displayResults([choice, pcchoice]);
  displayWinner([choice, pcchoice]);
}

function pcChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const pcWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "You win against pc";
      resultDivs[0].classList.add("winner");
      keepScore(1);
      // btnNext.classList.remove("hidden");
      // playAgainBtn.classList.remove("hidden");
    } else if (pcWins) {
      resultText.innerText = "You lose against pc";
      resultDivs[1].classList.add("winner");
      keepScore1(1);
      // btnNext.classList.add("hidden");
      // playAgainBtn.classList.remove("hidden");
    } else {
      resultText.innerText = "tie up";
      // btnNext.classList.add("hidden");
      // playAgainBtn.classList.remove("hidden");
    }
    resultWinner.classList.remove("hidden");
    resultsDiv.classList.add("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
  localStorage.setItem('score', score); // Save score to localStorage
}

function keepScore1(point) {
  score1 += point;
  scoreNumber1.innerText = score1;
  localStorage.setItem('score1', score1); // Save score to localStorage
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules
// btnRules.addEventListener("click", () => {
//   modalRules.classList.toggle("show-modal");
// });
// btnNext.addEventListener("click", () => {
//   modalRules.classList.toggle("show-modal2");
// });
// btnNext.addEventListener("click", () => {
//   modalRules.classList.remove("show-modal");
//   modalRules.classList.add("show-modal2");
// });
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
