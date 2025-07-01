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
  zoom: 5,
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
    mode: Phaser.Scale.FIT, // scale up to fit the parent
    autoCenter: Phaser.Scale.CENTER_BOTH, // center horizontally & vertically
    width: 160,
    height: 144,
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
