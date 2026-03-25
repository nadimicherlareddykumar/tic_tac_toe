(function() {
  'use strict';

  const STORAGE_KEY = 'neonTicTacToe_scores';

  const WIN_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const GameState = {
    EMPTY: null,
    X: 'X',
    O: 'O'
  };

  const GameMode = {
    PVP: 'pvp',
    AI: 'ai'
  };

  const AIDifficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
  };

  class ScoreManager {
    constructor() {
      this.data = this.load();
    }

    load() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : this.getDefaults();
      } catch (e) {
        return this.getDefaults();
      }
    }

    getDefaults() {
      return {
        total: { X: 0, O: 0, draw: 0 },
        ai: { wins: 0, losses: 0, games: 0 }
      };
    }

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      } catch (e) {
        console.warn('Could not save scores to localStorage');
      }
    }

    addWin(player) {
      this.data.total[player]++;
      this.save();
    }

    addDraw() {
      this.data.total.draw++;
      this.save();
    }

    addAIWin() {
      this.data.ai.wins++;
      this.data.ai.games++;
      this.save();
    }

    addAILoss() {
      this.data.ai.losses++;
      this.data.ai.games++;
      this.save();
    }

    clear() {
      this.data = this.getDefaults();
      this.save();
    }

    getTotals() {
      return this.data.total;
    }

    getAIStats() {
      return this.data.ai;
    }

    getTotalGames() {
      return this.data.total.X + this.data.total.O + this.data.total.draw;
    }
  }

  class TicTacToe {
    constructor() {
      this.board = Array(9).fill(GameState.EMPTY);
      this.currentPlayer = GameState.X;
      this.gameMode = GameMode.PVP;
      this.aiDifficulty = AIDifficulty.MEDIUM;
      this.gameOver = false;
      this.scores = { X: 0, O: 0, draw: 0 };
      this.scoreManager = new ScoreManager();

this.initElements();
    this.bindEvents();
    this.appContainer.classList.add('showing-start');
    this.updateTurnIndicator();
      this.updateScoreDisplay();
      this.updateLeaderboard();
    }

initElements() {
  this.appContainer = document.querySelector('.app-container');
  this.cells = document.querySelectorAll('.cell');
      this.boardEl = document.getElementById('gameBoard');
      this.turnValueEl = document.getElementById('currentTurn');
      this.scoreXEl = document.getElementById('scoreX');
      this.scoreOEl = document.getElementById('scoreO');
      this.scoreDrawEl = document.getElementById('scoreDraw');
      this.winLineEl = document.getElementById('winLine');
      this.startScreen = document.getElementById('startScreen');
      this.gameOverScreen = document.getElementById('gameOverScreen');
      this.winnerTextEl = document.getElementById('winnerText');
      this.aiDifficultyPanel = document.getElementById('aiDifficultyPanel');
      this.modePvPBtn = document.getElementById('modePvP');
      this.modeAIBtn = document.getElementById('modeAI');
      this.restartBtn = document.getElementById('restartBtn');
      this.newGameBtn = document.getElementById('newGameBtn');
      this.startModeBtns = document.querySelectorAll('.start-mode-btn');
      this.diffBtns = document.querySelectorAll('.diff-btn');
      this.leaderboardPanel = document.getElementById('leaderboardPanel');
      this.leaderboardToggle = document.getElementById('leaderboardToggle');
      this.closeLeaderboard = document.getElementById('closeLeaderboard');
      this.clearScoresBtn = document.getElementById('clearScores');
    }

    bindEvents() {
      this.cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleCellClick(cell);
        });
      });

      this.modePvPBtn.addEventListener('click', () => this.setGameMode(GameMode.PVP));
      this.modeAIBtn.addEventListener('click', () => this.setGameMode(GameMode.AI));

      this.diffBtns.forEach(btn => {
        btn.addEventListener('click', () => this.setAIDifficulty(btn.dataset.level));
      });

this.startModeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.startMode;
    this.gameMode = mode === 'ai' ? GameMode.AI : GameMode.PVP;
    this.updateModeButtons();
    this.startScreen.classList.add('hidden');
    this.appContainer.classList.remove('showing-start');
    if (this.gameMode === GameMode.AI) {
      this.aiDifficultyPanel.classList.remove('hidden');
    }
  });
});

      this.restartBtn.addEventListener('click', () => this.restart());
      this.newGameBtn.addEventListener('click', () => this.newGame());

      this.leaderboardToggle.addEventListener('click', () => {
        this.leaderboardPanel.classList.add('open');
        this.updateLeaderboard();
      });

      this.closeLeaderboard.addEventListener('click', () => {
        this.leaderboardPanel.classList.remove('open');
      });

      this.leaderboardPanel.addEventListener('click', (e) => {
        if (e.target === this.leaderboardPanel) {
          this.leaderboardPanel.classList.remove('open');
        }
      });

      this.clearScoresBtn.addEventListener('click', () => {
        if (confirm('Clear all scores? This cannot be undone.')) {
          this.scoreManager.clear();
          this.scores = { X: 0, O: 0, draw: 0 };
          this.updateScoreDisplay();
          this.updateLeaderboard();
        }
      });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !this.startScreen.classList.contains('hidden')) {
    this.startScreen.classList.add('hidden');
    this.appContainer.classList.remove('showing-start');
  }
  if (e.key === 'Escape') {
    this.leaderboardPanel.classList.remove('open');
  }
});
    }

    setGameMode(mode) {
      this.gameMode = mode;
      this.updateModeButtons();
      if (mode === GameMode.AI) {
        this.aiDifficultyPanel.classList.remove('hidden');
      } else {
        this.aiDifficultyPanel.classList.add('hidden');
      }
      this.restart();
    }

    updateModeButtons() {
      this.modePvPBtn.classList.toggle('active', this.gameMode === GameMode.PVP);
      this.modeAIBtn.classList.toggle('active', this.gameMode === GameMode.AI);
    }

    setAIDifficulty(level) {
      this.aiDifficulty = level;
      this.diffBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.level === level);
      });
    }

    handleCellClick(cell) {
      if (this.gameOver) return;

      const index = parseInt(cell.dataset.index, 10);
      if (this.board[index] !== GameState.EMPTY) return;

      this.makeMove(index);

      if (!this.gameOver && this.gameMode === GameMode.AI && this.currentPlayer === GameState.O) {
        setTimeout(() => this.makeAIMove(), 400);
      }
    }

    makeMove(index) {
      this.board[index] = this.currentPlayer;
      const cell = this.cells[index];
      cell.textContent = this.currentPlayer;
      cell.classList.add(this.currentPlayer.toLowerCase(), 'taken');

      const winCombo = this.checkWin(this.currentPlayer);
      if (winCombo) {
        this.handleWin(winCombo);
        return;
      }

      if (this.checkDraw()) {
        this.handleDraw();
        return;
      }

      this.switchPlayer();
    }

    checkWin(player) {
      for (const combo of WIN_COMBINATIONS) {
        if (combo.every(index => this.board[index] === player)) {
          return combo;
        }
      }
      return null;
    }

checkDraw() {
  return this.board.every(cell => cell !== GameState.EMPTY);
}

    handleWin(winCombo) {
      this.gameOver = true;
      this.scores[this.currentPlayer]++;
      this.scoreManager.addWin(this.currentPlayer);

      if (this.gameMode === GameMode.AI) {
        if (this.currentPlayer === GameState.X) {
          this.scoreManager.addAIWin();
        } else {
          this.scoreManager.addAILoss();
        }
      }

      this.updateScoreDisplay();
      this.updateLeaderboard();

      winCombo.forEach(index => {
        this.cells[index].classList.add('win');
      });

      this.showWinLine(winCombo);

      const winnerClass = this.currentPlayer === GameState.X ? 'winner-x' : 'winner-o';
      const modeSuffix = this.gameMode === GameMode.AI && this.currentPlayer === GameState.O ? ' (AI)' : '';
      this.winnerTextEl.textContent = `PLAYER ${this.currentPlayer}${modeSuffix} WINS`;
      this.winnerTextEl.className = `overlay-title ${winnerClass}`;

      setTimeout(() => {
        this.gameOverScreen.classList.remove('hidden');
      }, 800);
    }

    handleDraw() {
      this.gameOver = true;
      this.scores.draw++;
      this.scoreManager.addDraw();
      this.updateScoreDisplay();
      this.updateLeaderboard();

      this.winnerTextEl.textContent = 'DRAW';
      this.winnerTextEl.className = 'overlay-title winner-draw';

      setTimeout(() => {
        this.gameOverScreen.classList.remove('hidden');
      }, 500);
    }

    showWinLine(combo) {
      const [a, b, c] = combo;

      let isRow = [0, 1, 2].includes(a) && [0, 1, 2].includes(b) && [0, 1, 2].includes(c);
      let isCol = [0, 3, 6].includes(a) && [0, 3, 6].includes(b) && [0, 3, 6].includes(c);
      let isDiag = a === 0 && c === 8;
      let isAntiDiag = a === 2 && c === 6;

      let width, height, top, left, transform;

      if (isRow) {
        const row = Math.floor(a / 3);
        width = '80%';
        height = '4px';
        top = `${row * 33.33 + 4}%`;
        left = '10%';
        transform = 'none';
      } else if (isCol) {
        const col = a % 3;
        width = '4px';
        height = '80%';
        top = '10%';
        left = `${col * 33.33 + 4}%`;
        transform = 'none';
      } else if (isDiag) {
        width = '4px';
        height = '115%';
        top = '-5%';
        left = '50%';
        transform = 'rotate(45deg)';
      } else if (isAntiDiag) {
        width = '4px';
        height = '115%';
        top = '-5%';
        left = '50%';
        transform = 'rotate(-45deg)';
      }

      this.winLineEl.style.cssText = `
        width: ${width};
        height: ${height};
        top: ${top};
        left: ${left};
        transform: ${transform};
      `;
      this.winLineEl.classList.add('show');
    }

    switchPlayer() {
      this.currentPlayer = this.currentPlayer === GameState.X ? GameState.O : GameState.X;
      this.updateTurnIndicator();
    }

    updateTurnIndicator() {
      this.turnValueEl.textContent = this.currentPlayer;
      this.turnValueEl.className = `turn-value turn-${this.currentPlayer.toLowerCase()}`;
    }

    updateScoreDisplay() {
      this.scoreXEl.textContent = this.scores.X.toString().padStart(2, '0');
      this.scoreOEl.textContent = this.scores.O.toString().padStart(2, '0');
      this.scoreDrawEl.textContent = this.scores.draw.toString().padStart(2, '0');
    }

    updateLeaderboard() {
      const totals = this.scoreManager.getTotals();
      const aiStats = this.scoreManager.getAIStats();

      document.getElementById('lbWinsX').textContent = totals.X.toString().padStart(2, '0');
      document.getElementById('lbWinsO').textContent = totals.O.toString().padStart(2, '0');
      document.getElementById('lbWinsDraw').textContent = totals.draw.toString().padStart(2, '0');

      document.getElementById('lbAIWins').textContent = aiStats.wins.toString().padStart(2, '0');
      document.getElementById('lbAILosses').textContent = aiStats.losses.toString().padStart(2, '0');
      document.getElementById('lbAIGames').textContent = aiStats.games.toString().padStart(2, '0');

      document.getElementById('lbTotalGames').textContent = this.scoreManager.getTotalGames().toString().padStart(2, '0');
      document.getElementById('lbSessionX').textContent = this.scores.X.toString().padStart(2, '0');
      document.getElementById('lbSessionO').textContent = this.scores.O.toString().padStart(2, '0');
    }

    makeAIMove() {
      if (this.gameOver) return;

      let index;
      switch (this.aiDifficulty) {
        case AIDifficulty.EASY:
          index = this.getRandomMove();
          break;
        case AIDifficulty.MEDIUM:
          index = Math.random() < 0.5 ? this.getOptimalMove() : this.getRandomMove();
          break;
        case AIDifficulty.HARD:
          index = this.getOptimalMove();
          break;
        default:
          index = this.getRandomMove();
      }

      this.makeMove(index);
    }

    getRandomMove() {
      const available = this.board
        .map((cell, index) => cell === GameState.EMPTY ? index : null)
        .filter(index => index !== null);
      return available[Math.floor(Math.random() * available.length)];
    }

    getOptimalMove() {
      let bestScore = -Infinity;
      let bestMove = null;

      for (let i = 0; i < 9; i++) {
        if (this.board[i] === GameState.EMPTY) {
          this.board[i] = GameState.O;
          const score = this.minimax(this.board, 0, false);
          this.board[i] = GameState.EMPTY;

          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }

      return bestMove;
    }

    minimax(board, depth, isMaximizing) {
      const winner = this.checkWinner(board);
      if (winner === GameState.O) return 10 - depth;
      if (winner === GameState.X) return depth - 10;
      if (this.isBoardFull(board)) return 0;

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === GameState.EMPTY) {
            board[i] = GameState.O;
            const score = this.minimax(board, depth + 1, false);
            board[i] = GameState.EMPTY;
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
          if (board[i] === GameState.EMPTY) {
            board[i] = GameState.X;
            const score = this.minimax(board, depth + 1, true);
            board[i] = GameState.EMPTY;
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    }

    checkWinner(board) {
      for (const combo of WIN_COMBINATIONS) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    }

    isBoardFull(board) {
      return board.every(cell => cell !== GameState.EMPTY);
    }

    restart() {
      this.board = Array(9).fill(GameState.EMPTY);
      this.currentPlayer = GameState.X;
      this.gameOver = false;

      this.cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
      });

      this.winLineEl.classList.remove('show');
      this.winLineEl.style.cssText = '';
      this.updateTurnIndicator();
    }

    newGame() {
      this.gameOverScreen.classList.add('hidden');
      this.restart();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
  });
})();