import Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create() {
    const { width, height } = this.cameras.main;
    this.add
      .text(width / 2, height / 2 - 10, "BUSTED!", {
        fontSize: "16px",
        color: "#0f380f",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 10, "Press R to retry", {
        fontSize: "8px",
        color: "#0f380f",
      })
      .setOrigin(0.5);

    this.input.keyboard?.once("keydown-R", () => this.scene.start("GameScene"));
  }
}
