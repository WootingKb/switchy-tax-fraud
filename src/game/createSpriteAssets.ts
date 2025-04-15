import Phaser from "phaser";

export class SpriteAssets {
  static loadSimpleSprites(scene: Phaser.Scene): void {
    if (!scene.textures.exists("screenwipe")) {
      scene.load.image("screenwipe", "./assets/gfx/screenwipe.png");
    }
    if (!scene.textures.exists("maintitle")) {
      scene.load.image("maintitle", "./assets/gfx/maintitle.png");
    }
    if (!scene.textures.exists("titlewave")) {
      scene.load.image("titlewave", "./assets/gfx/titlewave.png");
    }
  }

  static loadSpriteSheets(scene: Phaser.Scene): void {
    if (!scene.textures.exists("switchy")) {
      scene.load.spritesheet("switchy", "./assets/gfx/switchy.png", {
        frameWidth: 16,
        frameHeight: 16,
      });
    }
    if (!scene.textures.exists("briefcase")) {
      scene.load.spritesheet("briefcase", "./assets/gfx/briefcase.png", {
        frameWidth: 16,
        frameHeight: 16,
      });
    }
    if (!scene.textures.exists("mail")) {
      scene.load.spritesheet("mail", "./assets/gfx/mail.png", {
        frameWidth: 16,
        frameHeight: 16,
      });
    }
    if (!scene.textures.exists("paper")) {
      scene.load.spritesheet("paper", "./assets/gfx/paper.png", {
        frameWidth: 16,
        frameHeight: 16,
      });
    }
    if (!scene.textures.exists("stapler")) {
      scene.load.spritesheet("stapler", "./assets/gfx/stapler.png", {
        frameWidth: 16,
        frameHeight: 16,
      });
    }
    if (!scene.textures.exists("taxman")) {
      scene.load.spritesheet("taxman", "./assets/gfx/taxman.png", {
        frameWidth: 32,
        frameHeight: 64,
      });
    }
    if (!scene.textures.exists("bg")) {
      scene.load.spritesheet("bg", "./assets/gfx/bg.png", {
        frameWidth: 16,
        frameHeight: 16,
      });
    }
  }

  static createSprites(scene: Phaser.Scene): void {
    if (!scene.anims.exists("switchy-walk")) {
      scene.anims.create({
        key: "switchy-walk",
        frames: scene.anims.generateFrameNumbers("switchy", {
          start: 0,
          end: 2,
        }),
        frameRate: 6,
        repeat: -1,
      });
    }
    if (!scene.anims.exists("briefcase-fall")) {
      scene.anims.create({
        key: "briefcase-fall",
        frames: scene.anims.generateFrameNumbers("briefcase", {
          start: 0,
          end: 0,
        }),
        frameRate: 6,
        repeat: -1,
      });
    }
    if (!scene.anims.exists("mail-fall")) {
      scene.anims.create({
        key: "mail-fall",
        frames: scene.anims.generateFrameNumbers("mail", { start: 0, end: 0 }),
        frameRate: 6,
        repeat: -1,
      });
    }
    if (!scene.anims.exists("paper-fall")) {
      scene.anims.create({
        key: "paper-fall",
        frames: scene.anims.generateFrameNumbers("paper", { start: 0, end: 0 }),
        frameRate: 6,
        repeat: -1,
      });
    }
    if (!scene.anims.exists("stapler-fall")) {
      scene.anims.create({
        key: "stapler-fall",
        frames: scene.anims.generateFrameNumbers("stapler", {
          start: 0,
          end: 0,
        }),
        frameRate: 6,
        repeat: -1,
      });
    }
    if (!scene.anims.exists("taxman-fall")) {
      scene.anims.create({
        key: "taxman-fall",
        frames: scene.anims.generateFrameNumbers("taxman", {
          start: 0,
          end: 1,
        }),
        frameRate: 6,
        repeat: -1,
      });
    }
    if (!scene.anims.exists("bg")) {
      scene.anims.create({
        key: "bg",
        frames: scene.anims.generateFrameNumbers("bg", {
          start: 0,
          end: 0,
        }),
        frameRate: 6,
        repeat: -1,
      });
    }
  }
}
