import Phaser from "phaser";
import { PlaceholderAssets } from "../createPlaceholderAssets";
import { AnalogKey, AnalogReport } from "../../components/ConnectDevice";

export class GameScene extends Phaser.Scene {
  private switchy!: Phaser.GameObjects.Sprite;

  private background!: Phaser.GameObjects.TileSprite;

  private jumpKey!: Phaser.Input.Keyboard.Key;

  private device!: HIDDevice | undefined;

  constructor() {
    super("GameScene");
  }

  setDevice(device: HIDDevice) {
    this.device = device;
    device.onanalogreport = (event) => {
      this.onAnalogReport(event);
    };
  }

  onAnalogReport = (event: AnalogReport) => {
    const { data } = event;
    const wKey = data.find((d) => d.key === AnalogKey.W)?.value ?? 0;
    const sKey = data.find((d) => d.key === AnalogKey.S)?.value ?? 0;
    const aKey = data.find((d) => d.key === AnalogKey.A)?.value ?? 0;
    const dKey = data.find((d) => d.key === AnalogKey.D)?.value ?? 0;

    const vertical = sKey - wKey;
    const horizontal = dKey - aKey;

    // The W key moves from center to the top of the screen
    // The S key moves from center to the bottom of the screen
    // The A key moves from center to the left of the screen
    // The D key moves from center to the right of the screen
    this.switchy.setPosition(
      this.cameras.main.width / 2 + (horizontal * this.cameras.main.width) / 2,
      this.cameras.main.height / 2 + (vertical * this.cameras.main.height) / 2
    );
  };

  preload() {
    // Create placeholder assets directly in the game
    PlaceholderAssets.createAssets(this);

    // Load specific image asset instead
    // this.load.image("switchy", "assets/switchy/idle.png");
  }

  create() {
    // Get current game dimensions
    const gameWidth = this.cameras.main.width;
    const gameHeight = this.cameras.main.height;

    // Set up background to fill the screen
    this.background = this.add
      .tileSprite(0, 0, gameWidth, gameHeight, "background")
      .setOrigin(0, 0)
      .setScrollFactor(0);

    // Update physics settings for framerate independence
    this.physics.world.setFPS(60);

    // Set up Switchy (the player character) using the hello texture to start
    // No physics for now
    this.switchy = this.add.sprite(gameWidth / 2, gameHeight / 2, "switchy");

    // Collision optimizations
    // this.switchy.setCollideWorldBounds(true);

    // Set up keyboard controls - ensure keyboard exists
    if (this.input.keyboard) {
      this.jumpKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
    }
  }

  update(time: number, delta: number) {
    // Convert delta to seconds for easier calculations
    const deltaSeconds = delta / 1000;

    // Jump when space is pressed or screen is tapped (handled via pointer events)
    // if (this.input.keyboard && Phaser.Input.Keyboard.JustDown(this.jumpKey)) {
    //   this.jump();
    // }
  }
}
