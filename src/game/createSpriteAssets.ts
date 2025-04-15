import Phaser from "phaser";

export class SpriteAssets {
  static loadSpriteSheets(scene: Phaser.Scene): void {
    scene.load.spritesheet("switchy", "src/assets/switchy.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  static createSprites(scene: Phaser.Scene): void {
    scene.anims.create({
      key: "switchy-walk",
      frames: scene.anims.generateFrameNumbers("switchy", { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1,
    });
  }
}
