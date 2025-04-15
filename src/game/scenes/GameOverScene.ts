import Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {
  private score: number = 0;

  init(data: { score: number }) {
    this.score = data.score;
  }

  constructor() {
    super("GameOverScene");
  }

  create() {
    const { width, height } = this.cameras.main;
    document.fonts.load('16px "Monogram"').then(() => {
      this.add
        .text(width / 2, height / 2 - 32, "BUSTED!", {
          fontFamily: "Monogram",
          fontSize: "16px",
          color: "#0f380f",
        })
        .setOrigin(0.5);

      this.add
        .text(width / 2, height / 2 - 16, `YOUR SCORE: ${this.score}`, {
          fontFamily: "Monogram",
          fontSize: "16px",
          color: "#0f380f",
        })
        .setOrigin(0.5);

      this.add
        .text(width / 2, height / 2 + 16, "Press Enter to continue", {
          fontFamily: "Monogram",
          fontSize: "16px",
          color: "#0f380f",
        })
        .setOrigin(0.5);
    });

    this.input.keyboard?.once("keydown-ENTER", () =>
      this.scene.start("MenuScene")
    );
  }
}
