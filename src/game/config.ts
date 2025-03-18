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
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container",
    expandParent: true,
    width: "100%",
    height: "100%",
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
