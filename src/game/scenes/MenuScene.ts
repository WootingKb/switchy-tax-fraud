import Phaser from "phaser";
import { SpriteAssets } from "../createSpriteAssets";

export class MenuScene extends Phaser.Scene {
  private selectedIndex: number = 0;
  private options: string[] = ["START GAME", "HI SCORES"];
  private optionTexts: Phaser.GameObjects.Text[] = [];
  private cursor!: Phaser.GameObjects.Triangle;

  constructor() {
    super("MenuScene");
  }

  preload() {
    SpriteAssets.loadSimpleSprites(this);
  }

  create() {
    const { width, height } = this.cameras.main;
    this.add.sprite(0, 0, "maintitle").setOrigin(0, 0);
    this.add.sprite(width, height / 2, "titlewave").setOrigin(1, 0);

    document.fonts.load('16px "Monogram"').then(() => {
      this.add
        .text(width / 2, height - 32, "Win prizes on Fri & Sat!", {
          fontFamily: "Monogram",
          fontSize: "16px",
          color: "#0f380f",
        })
        .setOrigin(0.5, 0.5);

      this.add
        .text(width / 2, height - 16, "2025 heidi@wooting", {
          fontFamily: "Monogram",
          fontSize: "16px",
          color: "#0f380f",
        })
        .setOrigin(0.5, 0.5);

      this.add
        .text(width / 2, height / 2 - 12, "TAX FRAUD", {
          fontFamily: "Monogram",
          fontSize: "24px",
          color: "#0f380f",
        })
        .setOrigin(0.5, 0.5);

      this.options.forEach((label, i) => {
        const text = this.add
          .text(width / 2, height / 2 + 8 + i * 16, label, {
            fontFamily: "Monogram",
            fontSize: "16px",
            color: "#0f380f",
          })
          .setOrigin(0.5, 0.5);
        this.optionTexts.push(text);
      });

      this.cursor = this.add
        .triangle(
          width / 2 - 50,
          this.optionTexts[0].y + 4,
          0,
          0,
          8,
          4,
          0,
          8,
          0x0f380f
        )
        .setOrigin(0.5, 0.75);
    });

    this.input.keyboard?.on("keydown-W", () => {
      this.selectedIndex =
        (this.selectedIndex + this.options.length - 1) % this.options.length;
      this.updateCursor();
    });

    this.input.keyboard?.on("keydown-S", () => {
      this.selectedIndex =
        (this.selectedIndex + this.options.length + 1) % this.options.length;
      this.updateCursor();
    });

    this.input.keyboard?.on("keydown-SPACE", () => {
      this.selectOption();
    });
  }

  updateCursor() {
    const targetText = this.optionTexts[this.selectedIndex];
    this.cursor.setY(targetText.y + 4);
  }

  selectOption() {
    const selected = this.options[this.selectedIndex];
    this.selectedIndex = 0;
    if (selected === "START GAME") {
      this.scene.start("ScenarioScene");
    } else if (selected === "HI SCORES") {
      this.scene.start("HighScoresScene");
    }
  }
}
