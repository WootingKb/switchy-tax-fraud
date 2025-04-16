import Phaser from "phaser";

export class Player {
  private scene: Phaser.Scene;
  private sprite: Phaser.Physics.Arcade.Sprite;
  private horizontal: number = 0;
  private body!: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, x: number, y: number, spriteName: string) {
    this.scene = scene;
    this.sprite = this.scene.physics.add.sprite(x, y, spriteName);
    this.sprite.play(`${spriteName}-walk`);
    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
    this.body.setSize(this.sprite.width * 0.7, this.sprite.height * 0.7);
    this.body.setOffset(
      (this.sprite.width - this.body.width) / 2,
      (this.sprite.height - this.body.height) / 2
    );
  }

  update(horizontal: number) {
    this.horizontal = horizontal;
    const newX =
      this.scene.cameras.main.width / 2 +
      (this.horizontal * this.scene.cameras.main.width) / 2;
    this.sprite.setPosition(newX, this.scene.cameras.main.height - 16);
  }

  getBody() {
    return this.sprite;
  }

  destroy() {
    this.sprite.destroy();
  }
}
