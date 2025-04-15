import Phaser from "phaser";

export class HighScoresScene extends Phaser.Scene {
  constructor() {
    super("HighScoresScene");
  }

  create() {
    const { width, height } = this.cameras.main;
    const stored = localStorage.getItem("switchy-hiscores");
    const scores = stored ? JSON.parse(stored) : [];

    document.fonts.load('20px "Monogram"').then(() => {
      this.add
        .text(width / 2, 20, "HIGH SCORES", {
          fontFamily: "Monogram",
          fontSize: "20px",
          color: "#0f380f",
        })
        .setOrigin(0.5);

      if (scores.length === 0) {
        this.add
          .text(width / 2, height / 2, "None yet...\nBe the first!", {
            fontFamily: "Monogram",
            fontSize: "20px",
            color: "#0f380f",
          })
          .setOrigin(0.5);
      } else {
        scores.forEach((entry: { name: string; score: number }, i: number) => {
          const y = 40 + i * 12;
          this.add
            .text(width / 2 - 40, y, `${i + 1}. ${entry.name}`, {
              fontFamily: "Monogram",
              fontSize: "20px",
              color: "#0f380f",
            })
            .setOrigin(0, 0);
          this.add
            .text(width / 2 + 40, y, `${entry.score}`, {
              fontFamily: "Monogram",
              fontSize: "20px",
              color: "#0f380f",
            })
            .setOrigin(1, 0);
        });
      }
      this.add
        .text(width / 2, height - 20, "Space to go back!", {
          fontFamily: "Monogram",
          fontSize: "20px",
          color: "#0f380f",
        })
        .setOrigin(0.5);
    });

    this.input.keyboard?.once("keydown-SPACE", () => {
      this.scene.start("MenuScene");
    });
  }
}
