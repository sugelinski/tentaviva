let players = [];
let currentPlayer = 0;
let flippedCards = [];
let matchedPairs = 0;
let level = 1;
let scores = [0, 0];

function startGame() {
  const p1 = document.getElementById("player1").value || "Jogador 1";
  const p2 = document.getElementById("player2").value || "Jogador 2";
  players = [p1, p2];
  currentPlayer = 0;
  level = 1;
  matchedPairs = 0;
  scores = [0, 0];
  showScreen("game-screen");
  initBoard();
  updateScoreboard();
}

function showTutorial() {
  showScreen("tutorial-screen");
}

function showHelp() {
  showScreen("help-screen");
}

function backToLogin() {
  showScreen("login-screen");
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function updateScoreboard() {
  document.getElementById("score1").textContent = `${players[0]}: ${scores[0]}`;
  document.getElementById("score2").textContent = `${players[1]}: ${scores[1]}`;
}

function initBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";
  const size = 4 + level; // aumenta dificuldade
  const totalCards = size;
  const symbols = ["🌙","⭐","🚀","🪐","☄️","🌌","🛰️","👽"];
  let deck = symbols.slice(0, totalCards/2);
  deck = deck.concat(deck); // pares
  deck.sort(() => Math.random() - 0.5);

  deck.forEach(symbol => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = symbol;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });

  document.getElementById("turn-info").textContent = `Vez de ${players[currentPlayer]}`;
}

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [c1, c2] = flippedCards;
  if (c1.textContent === c2.textContent) {
    matchedPairs++;
    scores[currentPlayer]++;
    updateScoreboard();

    // Verifica se terminou o nível
    const totalPairs = (document.querySelectorAll(".card").length) / 2;
    if (matchedPairs === totalPairs) {
      setTimeout(() => {
        alert(`Fim do nível ${level}! Placar: ${players[0]} ${scores[0]} x ${scores[1]} ${players[1]}`);
      }, 500);
    }
  } else {
    c1.classList.remove("flipped");
    c2.classList.remove("flipped");
    currentPlayer = (currentPlayer + 1) % players.length;
  }
  flippedCards = [];
  document.getElementById("turn-info").textContent = `Vez de ${players[currentPlayer]}`;
}

function nextLevel() {
  level++;
  matchedPairs = 0;
  initBoard();
}
