import Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create() {
    const { width, height } = this.cameras.main;
    document.fonts.load('16px "Monogram"').then(() => {
      this.add
        .text(width / 2, height / 2 - 10, "BUSTED!", {
          fontFamily: "Monogram",
          fontSize: "16px",
          color: "#0f380f",
        })
        .setOrigin(0.5);

      this.add
        .text(width / 2, height / 2 + 10, "Press Backspace to go back", {
          fontFamily: "Monogram",
          fontSize: "16px",
          color: "#0f380f",
        })
        .setOrigin(0.5);
    });

    this.input.keyboard?.once("keydown-BACKSPACE", () =>
      this.scene.start("MenuScene")
    );
  }
}
