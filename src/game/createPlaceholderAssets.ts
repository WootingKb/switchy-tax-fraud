import Phaser from "phaser";

export class PlaceholderAssets {
  static createAssets(scene: Phaser.Scene): void {
    // Example of creating a placeholder asset
    // Create Switchy - A small rectangle representing the keyboard switch
    PlaceholderAssets.createSwitchyTexture(scene);
    // Create Background - A simple gradient
    PlaceholderAssets.createBackgroundTexture(scene);
  }

  private static createSwitchyTexture(scene: Phaser.Scene): void {
    const graphics = scene.make.graphics();

    // Switchy body (red rectangle)
    graphics.fillStyle(0xff0000);
    graphics.fillRect(0, 0, 40, 40);

    // Details (white line)
    graphics.lineStyle(2, 0xffffff);
    graphics.strokeRect(5, 5, 30, 30);

    graphics.generateTexture("switchy", 40, 40);
    graphics.destroy();
  }

  private static createBackgroundTexture(scene: Phaser.Scene): void {
    const width = 800;
    const height = 800;
    const graphics = scene.make.graphics();

    // Sky color (since we can't do gradient easily)
    graphics.fillStyle(0x4bb8ff);
    graphics.fillRect(0, 0, width, height);

    // Add some simple clouds
    graphics.fillStyle(0xffffff);
    graphics.fillCircle(100, 100, 30);

    graphics.generateTexture("background", width, height);
    graphics.destroy();
  }
}
