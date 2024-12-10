// Game variables
let score = 0;
let timeLeft = 10; // 10 seconds
let gameActive = true;

// DOM elements
const clickButton = document.getElementById('click-button');
const scoreBoard = document.getElementById('score-board');
const countdown = document.getElementById('countdown');

// WebSocket for multiplayer communication (local for testing)
const socket = new WebSocket('ws://localhost:8080');

// Click button logic
clickButton.addEventListener('click', () => {
  if (!gameActive) return;

  score++;
  scoreBoard.textContent = `Score: ${score}`;
  socket.send(JSON.stringify({ type: 'update-score', score }));
});
// Add player score to the server
function addPlayerScore(name, score) {
    fetch('/add_score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Score added:", data);
        fetchScoreboard();
      });
  }
  
  // Fetch scoreboard from the server
  function fetchScoreboard() {
    fetch('/get_scores')
      .then((response) => response.json())
      .then((data) => {
        const scoreList = document.getElementById('score-list');
        scoreList.innerHTML = data
          .map((entry) => `<li>${entry.name}: ${entry.score}</li>`)
          .join('');
      });
  }
  

// Countdown timer
const timer = setInterval(() => {
  if (timeLeft <= 0) {
    clearInterval(timer);
    gameActive = false;
    clickButton.disabled = true;
    socket.send(JSON.stringify({ type: 'game-over', score }));
    return;
  }
  timeLeft--;
  countdown.textContent = `Time Left: ${timeLeft}s`;
}, 1000);

// Handle WebSocket messages
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'update-score') {
    // Display opponent score
    document.getElementById('opponent-score').textContent = `Opponent: ${data.score}`;
  }
};

socket.onopen = () => console.log('Connected to server');
