<div align="center">
  <h1 align="center">Neon Tic-Tac-Toe 🎮</h1>
  <p align="center">
    A Cyberpunk-themed Tic-Tac-Toe web game with AI and local 2-player modes.
  </p>
  <p>
    <img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/>
    <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>
    <img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
  </p>
</div>

## 🌟 Features

- 🤖 **Single Player Mode:** Play against an AI with 3 difficulty levels:
  - **Easy:** Random moves for a relaxed game.
  - **Medium:** A mix of optimal and random strategies.
  - **Hard:** Unbeatable Minimax algorithm!
- 👥 **Two Player Mode:** Play locally against a friend.
- 🎨 **Cyberpunk UI/UX:** Neon glow effects, custom typography, and dynamic animations.
- 📱 **Responsive Design:** Playable on both desktop and mobile devices.
- 🏆 **Leaderboard System:** Persistent local storage keeping track of scores.

## 🛠️ Technology Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+).
- **Styling:** Custom CSS variables for neon themes (Cyan, Pink, Lime, Dark background).
- **Storage:** LocalStorage API for persisting scores.

## 🚀 How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/nadimicherlareddykumar/tic_tac_toe.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tic_tac_toe
   ```
3. Open `index.html` in your favorite web browser.
   - Or use a local development server like Live Server (VS Code) or `npx serve .`.

## 🎮 How to Play

1. Choose your game mode: "Player vs Player" or "Player vs AI".
2. If playing against AI, select your preferred difficulty level.
3. Click on any empty cell in the 3x3 grid to make your move (X or O).
4. The first player to get 3 of their marks in a row (up, down, across, or diagonally) is the winner!
5. When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.

## 📂 Project Structure

```
/
├── index.html   # Main HTML structure
├── style.css    # Cyberpunk styling with neon effects
├── script.js    # Game logic, AI (Minimax), and UI handlers
├── AGENTS.md    # Developer guidelines and project goals
└── README.md    # Project documentation
```

## 📜 Credits

Created by [Reddy Kumar](https://github.com/nadimicherlareddykumar).
