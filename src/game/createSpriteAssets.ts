import Phaser from "phaser";

export class SpriteAssets {
  static loadSpriteSheets(scene: Phaser.Scene): void {
    scene.load.spritesheet("switchy", "src/assets/switchy.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    scene.load.spritesheet("briefcase", "src/assets/briefcase.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    scene.load.spritesheet("mail", "src/assets/mail.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    scene.load.spritesheet("paper", "src/assets/paper.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    scene.load.spritesheet("stapler", "src/assets/stapler.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    scene.load.spritesheet("taxman", "src/assets/taxman.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  static createSprites(scene: Phaser.Scene): void {
    scene.anims.create({
      key: "switchy-walk",
      frames: scene.anims.generateFrameNumbers("switchy", { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "briefcase-fall",
      frames: scene.anims.generateFrameNumbers("briefcase", {
        start: 0,
        end: 0,
      }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "mail-fall",
      frames: scene.anims.generateFrameNumbers("mail", { start: 0, end: 0 }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "paper-fall",
      frames: scene.anims.generateFrameNumbers("paper", { start: 0, end: 0 }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "stapler-fall",
      frames: scene.anims.generateFrameNumbers("stapler", { start: 0, end: 0 }),
      frameRate: 6,
      repeat: -1,
    });
    scene.anims.create({
      key: "taxman-fall",
      frames: scene.anims.generateFrameNumbers("taxman", { start: 0, end: 1 }),
      frameRate: 6,
      repeat: -1,
    });
  }
}
