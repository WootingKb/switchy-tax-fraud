import Phaser from "phaser";

export class InputBar {
  private scene: Phaser.Scene;
  private graphics: Phaser.GameObjects.Graphics;
  private width: number;
  private height: number;
  private barHeight: number = 4;
  private barColor: number = 0x0f380f;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.width = scene.cameras.main.width;
    this.height = scene.cameras.main.height;

    this.graphics = scene.add.graphics().setDepth(999);
    this.graphics.setScrollFactor(0);
  }

  update(lValue: number, rValue: number) {
    const centerX = this.width / 2;
    const barY = this.height - this.barHeight;
    const barWidth = this.width / 2;
    const leftWidth = barWidth * lValue;
    const rightWidth = barWidth * rValue;

    this.graphics.clear();

    if (lValue > 0) {
      this.graphics.fillStyle(this.barColor);
      this.graphics.fillRect(
        centerX - leftWidth - 1,
        barY,
        leftWidth,
        this.barHeight
      );
    }
    if (rValue > 0) {
      this.graphics.fillStyle(this.barColor);
      this.graphics.fillRect(centerX + 1, barY, rightWidth, this.barHeight);
    }
  }

  destroy() {
    this.graphics.destroy();
  }
}
