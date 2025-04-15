import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#242424",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600, x: 0 },
      debug: false,
    },
  },
  scene: [GameScene],
  // pixelArt: true,
  scale: {
    parent: "game-div",

    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,

    // expandParent: true,

    // Just create a square game container
    width: 1000,
    height: 1000,
  },
  input: {
    activePointers: 3,
    touch: { capture: true },
  },
  render: {
    antialias: true,
    // pixelArt: true,
    // roundPixels: true,
  },
};
