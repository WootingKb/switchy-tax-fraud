import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#9bbc0f",
  width: 160,
  height: 144,
  zoom: 4,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    },
  },
  scene: [GameScene],
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
