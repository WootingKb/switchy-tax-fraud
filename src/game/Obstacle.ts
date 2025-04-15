import Phaser from "phaser";

export class Obstacle {
  private scene: Phaser.Scene;
  private sprite: Phaser.Physics.Arcade.Sprite;
  private speed: number;

  constructor(scene: Phaser.Scene, x: number, type: string) {
    this.scene = scene;
    this.sprite = this.scene.physics.add.sprite(x, -128, type);
    this.sprite.play(`${type}-fall`, true);
    this.sprite.setOrigin(0.5, 1);

    this.speed = Phaser.Math.Between(30, 60);
  }

  update(deltaSeconds: number) {
    this.sprite.setVelocityY(this.speed);

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
