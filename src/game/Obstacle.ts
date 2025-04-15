import Phaser from "phaser";

export class Obstacle {
  private scene: Phaser.Scene;
  private sprite: Phaser.Physics.Arcade.Sprite;
  private speed: number;
  private obstacleType: string;
  private movementType: string;
  private acceleration: number = 0;
  private flutterAmplitude: number = 0;
  private flutterFrequency: number = 0;
  private flutterOffset: number = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    obstacleType: string,
    movementType: string,
    score: number
  ) {
    this.scene = scene;
    this.obstacleType = obstacleType;
    this.movementType = movementType;
    this.sprite = this.scene.physics.add.sprite(x, -16, obstacleType);
    this.sprite.play(`${obstacleType}-fall`, true);
    this.sprite.setOrigin(0.5, 1);

    const minSpeed = 30 + score * 0.5;
    const maxSpeed = 60 + score;

    this.speed = Phaser.Math.Between(minSpeed, maxSpeed);
    this.acceleration = 0;
    if (movementType === "fast") {
      this.acceleration = 200 + score * 5;
    }
    if (movementType === "flutter") {
      this.flutterAmplitude = Phaser.Math.Between(5, 15);
      this.flutterFrequency = Phaser.Math.FloatBetween(3, 6);
      this.flutterOffset = Phaser.Math.FloatBetween(0, Math.PI * 2);
    }
  }

  update(deltaSeconds: number) {
    if (!this.sprite.active) return;
    if (this.movementType === "fast") {
      this.speed += this.acceleration * deltaSeconds;
    }
    if (this.movementType === "flutter") {
      const time = this.scene.time.now / 1000;
      const offset =
        Math.sin(time * this.flutterFrequency + this.flutterOffset) *
        this.flutterAmplitude;
      this.sprite.x += offset * deltaSeconds;
    }
    this.sprite.y += this.speed * deltaSeconds;

    if (this.sprite.y > this.scene.cameras.main.height + 128) {
      this.sprite.destroy();
    }
  }

  getBody(): Phaser.GameObjects.Sprite {
    return this.sprite;
  }

  isAlive(): boolean {
    return this.sprite.active;
  }

  destroy(): void {
    this.sprite.destroy();
  }
}
