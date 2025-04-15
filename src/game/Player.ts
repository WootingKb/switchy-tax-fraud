import Phaser from "phaser";

export class Player {
  private scene: Phaser.Scene;
  private sprite: Phaser.GameObjects.Sprite;
  private horizontal: number = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, spriteName: string) {
    this.scene = scene;
    this.sprite = this.scene.add.sprite(x, y, spriteName);
    this.sprite.play("walk");
  }

  update(horizontal: number) {
    this.horizontal = horizontal;
    const newX =
      this.scene.cameras.main.width / 2 +
      (this.horizontal * this.scene.cameras.main.width) / 2;
    this.sprite.setPosition(newX, this.scene.cameras.main.height - 16);
  }
}
