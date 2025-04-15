import Phaser from "phaser";
import { PlaceholderAssets } from "../createPlaceholderAssets";
import { AnalogKey, AnalogReport } from "../../components/ConnectDevice";
import { SpriteAssets } from "../createSpriteAssets";

export class GameScene extends Phaser.Scene {
  private switchy!: Phaser.GameObjects.Sprite;

  private background!: Phaser.GameObjects.TileSprite;

  private jumpKey!: Phaser.Input.Keyboard.Key;

  private device!: HIDDevice | undefined;

  private horizontal: number = 0;

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
    const aKey = data.find((d) => d.key === AnalogKey.A)?.value ?? 0;
    const dKey = data.find((d) => d.key === AnalogKey.D)?.value ?? 0;

    this.horizontal = dKey - aKey;
  };

  preload() {
    // Create placeholder assets directly in the game
    PlaceholderAssets.createAssets(this);

    // Load sprites from asset handler
    SpriteAssets.loadSpriteSheets(this);
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

    // Load sprites from asset handler
    SpriteAssets.createSprites(this);

    // Set up Switchy (the player character)
    this.switchy = this.add.sprite(gameWidth / 2, gameHeight - 16, "switchy");
    this.switchy.play("switchy-walk");

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

    // The A key moves from center to the left of the screen
    // The D key moves from center to the right of the screen
    // Update position according to horizontal
    this.switchy.setPosition(
      this.cameras.main.width / 2 +
        (this.horizontal * this.cameras.main.width) / 2,
      this.cameras.main.height - 16
    );

    // Jump when space is pressed or screen is tapped (handled via pointer events)
    // if (this.input.keyboard && Phaser.Input.Keyboard.JustDown(this.jumpKey)) {
    //   this.jump();
    // }
  }
}
