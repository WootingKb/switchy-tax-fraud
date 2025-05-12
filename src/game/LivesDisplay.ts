import Phaser from "phaser";

export class LivesDisplay {
  private scene: Phaser.Scene;
  private sprites: Phaser.GameObjects.Sprite[] = [];
  private x: number;
  private y: number;
  private spacing: number;
  private totalLives: number;
  private livesRemaining: number;

  constructor(
    scene: Phaser.Scene,
    x: number = 4,
    y: number = 4,
    spacing: number = 18,
    totalLives: number = 3,
    livesRemaining: number = 3
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.spacing = spacing;
    this.totalLives = totalLives;
    this.livesRemaining = livesRemaining;

    for (let i = 0; i < this.totalLives; i++) {
      const heart = scene.add
        .sprite(x + i * spacing, y, "heart", livesRemaining > i ? 0 : 1)
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDepth(1000);
      this.sprites.push(heart);
    }
  }

  updateLivesRemaining(lives: number) {
    this.livesRemaining = lives;
    for (let i = 0; i < this.sprites.length; i++) {
      this.sprites[i].setFrame(i < this.livesRemaining ? 0 : 1);
    }
  }

  destroy() {
    this.sprites.forEach((s) => s.destroy());
  }
}
