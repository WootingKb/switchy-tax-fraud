import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { MenuScene } from "./scenes/MenuScene";
import { NameEntryScene } from "./scenes/NameEntryScene";
import { HighScoresScene } from "./scenes/HighScoresScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#9bbc0f",
  width: 160,
  height: 144,
  zoom: 6,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    },
  },
  scene: [MenuScene, GameScene, GameOverScene, NameEntryScene, HighScoresScene],
  scale: {
    parent: "game-container",
  },
  input: {
    activePointers: 3,
    touch: { capture: true },
  },
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true,
  },
};
