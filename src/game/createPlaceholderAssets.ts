import Phaser from "phaser";

export class PlaceholderAssets {
  static createAssets(scene: Phaser.Scene): void {
    // Create Background - A simple gameboy background
    PlaceholderAssets.createBackgroundTexture(scene);
  }

  private static createBackgroundTexture(scene: Phaser.Scene): void {
    const width = 160;
    const height = 144;
    const graphics = scene.make.graphics();

    graphics.generateTexture("background", width, height);
    graphics.destroy();
  }
}
