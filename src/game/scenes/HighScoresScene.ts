import Phaser from "phaser";

export class HighScoresScene extends Phaser.Scene {
  private scores: { name: string; score: number }[] = [];
  private scrollIndex: number = 0;
  private scoreTexts: Phaser.GameObjects.Text[] = [];
  private maxVisible: number = 5;

  constructor() {
    super("HighScoresScene");
  }

  create() {
    const { width, height } = this.cameras.main;
    const stored = localStorage.getItem("switchy-hiscores");
    this.scores = stored ? JSON.parse(stored) : [];
    this.scrollIndex = 0;

    document.fonts.load('20px "Monogram"').then(() => {
      this.add
        .text(width / 2, 10, "HIGH SCORES", {
          fontFamily: "Monogram",
          fontSize: "32px",
          color: "#0f380f",
        })
        .setOrigin(0.5);

      this.renderScores();

      this.add
        .text(width / 2, height - 20, "W/S to scroll,\nSpace to go back!", {
          fontFamily: "Monogram",
          fontSize: "16px",
          color: "#0f380f",
        })
        .setOrigin(0.5);
    });

    this.input.keyboard?.on(
      "keydown",
      (event: KeyboardEvent) => {
        if ([" ", "Enter"].includes(event.key)) {
          this.scene.start("MenuScene");
        } else if (["w", "ArrowUp"].includes(event.key)) {
          this.scrollUp();
        } else if (["s", "ArrowDown"].includes(event.key)) {
          this.scrollDown();
        }
      },
      this
    );
  }

  renderScores() {
    this.scoreTexts.forEach((t) => t.destroy());
    this.scoreTexts = [];

    const { width } = this.cameras.main;

    if (this.scores.length === 0) {
      this.scoreTexts.push(
        this.add
          .text(width / 2, 100, "None yet...\nBe the first!", {
            fontFamily: "Monogram",
            fontSize: "16px",
            color: "#0f380f",
          })
          .setOrigin(0.5)
      );
      return;
    }

    this.scrollIndex = Phaser.Math.Clamp(
      this.scrollIndex,
      0,
      Math.max(0, this.scores.length - this.maxVisible)
    );

    for (let i = 0; i < this.maxVisible; i++) {
      const entry = this.scores[this.scrollIndex + i];
      if (!entry) break;
      const y = 30 + i * 14;
      this.scoreTexts.push(
        this.add
          .text(20, y, `${this.scrollIndex + i + 1}. ${entry.name}`, {
            fontFamily: "Monogram",
            fontSize: "16px",
            color: "#0f380f",
          })
          .setOrigin(0)
      );
      this.scoreTexts.push(
        this.add
          .text(width - 20, y, `${entry.score}`, {
            fontFamily: "Monogram",
            fontSize: "16px",
            color: "#0f380f",
          })
          .setOrigin(1, 0)
      );
    }
  }

  scrollUp() {
    if (this.scrollIndex > 0) {
      this.scrollIndex--;
      this.renderScores();
    }
  }

  scrollDown() {
    if (this.scrollIndex < Math.max(0, this.scores.length - this.maxVisible)) {
      this.scrollIndex++;
      this.renderScores();
    }
  }
}
