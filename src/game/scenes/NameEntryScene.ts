import Phaser from "phaser";
import profane from "../profanity.json";

export class NameEntryScene extends Phaser.Scene {
  private enteredName: string = "";
  private score: number = 0;
  private nameText!: Phaser.GameObjects.Text;
  private profaneWords!: string[];

  constructor() {
    super("NameEntryScene");
  }

  init(data: { score: number }) {
    this.score = data.score;
    this.enteredName = "";
  }

  preload() {
    this.profaneWords = profane.profane;
  }

  create() {
    const { width, height } = this.cameras.main;

    document.fonts.load('20px "Monogram"').then(() => {
      this.add
        .text(width / 2, 10, "ENTER YOUR NAME", {
          fontFamily: "Monogram",
          fontSize: "20px",
          color: "#0f380f",
        })
        .setOrigin(0.5);

      this.add
        .text(width / 2, height - 24, "Confirm: SPACE", {
          fontFamily: "Monogram",
          fontSize: "20px",
          color: "#0f380f",
        })
        .setOrigin(0.5);

      this.nameText = this.add
        .text(width / 2, height / 2, `________`, {
          fontFamily: "Monogram",
          fontSize: "20px",
          color: "#0f380f",
        })
        .setOrigin(0.5);

      this.input.keyboard?.on("keydown", (event: KeyboardEvent) => {
        const key = event.key;
        if (/^[a-zA-Z]$/.test(key) && this.enteredName.length < 8) {
          this.enteredName += key.toUpperCase();

          this.updateNameDisplay();
        } else if (event.key === "Backspace" && this.enteredName.length > 0) {
          this.enteredName = this.enteredName.slice(0, -1);
          this.updateNameDisplay();
        } else if (event.key === " ") {
          this.saveScore();
          this.scene.start("MenuScene");
        }
      });
    });
  }

  updateNameDisplay() {
    const padded = this.enteredName.padEnd(8, "_");
    this.nameText.setText(padded);
  }

  saveScore() {
    if (this.profaneWords.includes(this.enteredName.toLowerCase())) {
      this.enteredName = "CUDDLES";
      alert("That's not a nice word :)\nHow about I call you CUDDLES instead?");
    }
    const newEntry = { name: this.enteredName, score: this.score };
    const stored = localStorage.getItem("switchy-hiscores");
    const scores = stored ? JSON.parse(stored) : [];

    scores.push(newEntry);
    scores.sort((a: any, b: any) => b.score - a.score);

    localStorage.setItem("switchy-hiscores", JSON.stringify(scores));
  }
}
