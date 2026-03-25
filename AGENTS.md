# AGENTS.md - Neon Tic-Tac-Toe Project

## Project Overview
Cyberpunk-themed Tic-Tac-Toe web game with AI and local 2-player modes. Built with vanilla HTML/CSS/JS, deployable to Vercel.

## Project Structure
```
/tic-tac-toe
├── index.html   # Main HTML structure
├── style.css    # Cyberpunk styling with neon effects
├── script.js    # Game logic, AI, and UI handlers
└── AGENTS.md    # This file
```

---

## Build & Development Commands

### Local Development
```bash
# VS Code: right-click index.html -> "Open with Live Server"
# Or: npx serve . (opens http://localhost:3000)
```

### Testing (Browser-Based)
```bash
# Manual testing via browser console:
runTest('winDetection')  # Test all 8 win combinations
runTest('aiEasy')        # Verify random AI moves
runTest('aiHard')        # Verify minimax AI

# LocalStorage is used for persistent scores:
# Key: 'neonTicTacToe_scores'
# Clear in console: localStorage.removeItem('neonTicTacToe_scores')
```

### Deployment (Vercel)
```bash
npm i -g vercel
vercel
# Or connect GitHub repo to Vercel for auto-deployments
```

---

## Code Style Guidelines

### General Principles
- ES6+ features (const/let, arrow functions, template literals)
- IIFE pattern: `(function() { ... })();`
- 'use strict' at top of JS files
- Keep functions small and focused (single responsibility)

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Classes | PascalCase | `TicTacToe`, `GameState` |
| Constants | UPPER_SNAKE_CASE | `WIN_COMBINATIONS` |
| Variables/Functions | camelCase | `makeMove`, `currentPlayer` |
| CSS Classes | kebab-case | `.glitch-text`, `.neon-cyan` |
| Files | kebab-case | `style.css`, `script.js` |

### Formatting Rules
- Indentation: 2 spaces (no tabs)
- Max line length: 100 characters
- Use semicolons consistently
- One blank line between logical sections

### JavaScript Patterns
```javascript
(function() {
  'use strict';

  const CONSTANT = 'value';

  function initElements() { }

  function handleEvent(e) {
    if (e.target === null) return; // Guard clause
    // ... logic
  }

  element.addEventListener('click', () => this.handleClick());
})();
```

### CSS Patterns
```css
:root { --neon-cyan: #00ffff; --bg-dark: #050505; }
.game-board { }
.game-board__cell { }
.game-board__cell--win { }
```

### Error Handling
- Use guard clauses for early returns
- Always check DOM element existence before using
- Wrap AI computations in try-catch (prevent game freeze)

---

## Agent Workflows

### Agent 1: Coder
**Responsibilities:** Implement features, bug fixes, test in browser
**Workflow:** Read AGENTS.md -> Make changes -> Test -> Update docs if needed

### Agent 2: Documentation
**Responsibilities:** Maintain AGENTS.md, document new features
**Workflow:** Review changes -> Update AGENTS.md -> Add inline comments

### Agent 3: Debugger/Tester
**Responsibilities:** Fix bugs, test edge cases, verify compatibility

**Testing Checklist:**
- [ ] Win detection for all 8 combinations
- [ ] Draw detection when board is full
- [ ] AI Easy makes random valid moves
- [ ] AI Hard is unbeatable (minimax)
- [ ] Mode switching (PvP <-> AI) works
- [ ] Restart resets board but keeps scores
- [ ] New Game resets everything
- [ ] Leaderboard opens/closes properly
- [ ] Scores persist in localStorage across sessions
- [ ] Clear scores button works
- [ ] Mobile responsiveness works on small screens

**Debug Commands:**
```javascript
console.log(game.board);              // Check game state
game.board = ['X','X','','','','','','','O']; game.checkWin('X');
game.aiDifficulty = 'hard'; game.makeAIMove();
```

---

## Configuration

### AI Difficulty Levels
| Level | Behavior | Implementation |
|-------|----------|----------------|
| Easy | Random moves | `getRandomMove()` - 100% random |
| Medium | Mixed strategy | 50% optimal, 50% random |
| Hard | Unbeatable | Minimax with depth scoring |

### Color Scheme (CSS Variables)
- `--neon-pink: #ff00ff` | `--neon-cyan: #00ffff` | `--neon-lime: #00ff00` | `--bg-dark: #050505`

---

## Notes
- Vanilla JS for minimal dependencies
- For scaling: split script.js into modules (game.js, ai.js, ui.js)
- Vercel deployment is free for static sites
- External resources must be CDN-accessible