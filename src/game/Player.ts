import Phaser from "phaser";

export class Player {
  private scene: Phaser.Scene;
  private sprite: Phaser.Physics.Arcade.Sprite;
  private lives: number = 3;
  private invincible: boolean = false;
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

  depleteLives() {
    this.lives -= 1;
  }

  getLives() {
    return this.lives;
  }

  isInvincible(): boolean {
    return this.invincible;
  }

  setInvincible(state: boolean) {
    this.invincible = state;
  }

  startInvincibility(duration: number = 1000) {
    this.invincible = true;
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.2,
      duration: 100,
      yoyo: true,
      repeat: duration / 100 / 2,
      onComplete: () => {
        this.invincible = false;
        this.sprite.setAlpha(1);
      },
    });
  }

  getBody() {
    return this.sprite;
  }

  destroy() {
    this.sprite.destroy();
  }
}
