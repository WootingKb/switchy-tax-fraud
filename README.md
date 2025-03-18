# Flappy Tappy

A clone of Flappy Bird featuring Switchy, a Wooting Lekker keyboard switch as the main character.

## Technologies Used

- TypeScript
- React
- Phaser 3
- Vite
- Yarn

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd flappy-tappy
   ```

2. Install dependencies:

   ```
   yarn install
   ```

3. Start the development server:

   ```
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Game Controls

- Press **SPACEBAR** to make Switchy jump
- Press **R** to restart the game after game over

## Analog Control Feature (Coming Soon)

In the future, this game will support analog keyboard input using the velocity of key presses to control Switchy's jump height. This feature will be integrated in a future update.

## Development Structure

- `src/game/` - Contains Phaser game code
  - `scenes/` - Game scenes (main gameplay, menu, etc.)
  - `objects/` - Game object classes
  - `assets/` - Game asset utilities
- `src/components/` - React components that integrate the Phaser game

## Adding Real Assets

The game currently uses generated placeholder assets. To add your own custom assets:

1. Add your image files to the `public/assets/` directory
2. Update the asset paths in `src/game/scenes/GameScene.ts`

## License

[MIT](LICENSE)
