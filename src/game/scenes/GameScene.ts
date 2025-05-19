import Phaser from "phaser";
import { Player } from "../Player";
import { PlaceholderAssets } from "../createPlaceholderAssets";
import { AnalogKey, AnalogReport } from "../../components/ConnectDevice";
import { SpriteAssets } from "../createSpriteAssets";
import { Obstacle } from "../Obstacle";
import { InputBar } from "../InputBar";
import { LivesDisplay } from "../LivesDisplay";

export class GameScene extends Phaser.Scene {
  private player!: Player;

  private obstacles: Obstacle[] = [];
  private obstacleTimer: number = 0;

  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private scoreTimer!: Phaser.Time.TimerEvent;

  private switchy!: Phaser.GameObjects.Sprite;

  private background!: Phaser.GameObjects.TileSprite;

  private jumpKey!: Phaser.Input.Keyboard.Key;

  private device!: HIDDevice | undefined;

  private horizontal: number = 0;

  private gameEnded: boolean = false;

  private inputBar!: InputBar;
  private analogL: number = 0;
  private analogR: number = 0;

  private livesDisplay!: LivesDisplay;

  constructor() {
    super("GameScene");
  }

  setDevice(device: HIDDevice) {
    this.device = device;
    device.onanalogreport = (event) => {
      this.onAnalogReport(event);
    };
  }

  closeDevice() {
    if (this.device) {
      this.device.onanalogreport = undefined;
      this.device = undefined;
    }
  }

  onAnalogReport = (event: AnalogReport) => {
    const { data } = event;
    this.analogL = data.find((d) => d.key === AnalogKey.A)?.value ?? 0;
    this.analogR = data.find((d) => d.key === AnalogKey.D)?.value ?? 0;

    this.horizontal = this.analogR - this.analogL;
  };

  preload() {
    // Create placeholder assets directly in the game
    PlaceholderAssets.createAssets(this);

    // Load sprites from asset handler
    SpriteAssets.loadSpriteSheets(this);

    SpriteAssets.loadSimpleSprites(this);
  }

  create() {
    this.gameEnded = false;
    this.score = 0;
    // Get current game dimensions
    const gameWidth = this.cameras.main.width;
    const gameHeight = this.cameras.main.height;

    // Update physics settings for framerate independence
    this.physics.world.setFPS(60);

    // Load sprites from asset handler
    SpriteAssets.createSprites(this);

    // Set up background to fill the screen
    this.background = this.add
      .tileSprite(0, 0, gameWidth, gameHeight, "bg")
      .setOrigin(0, 0)
      .setScrollFactor(0);

    // Set up Switchy (the player character)
    this.player = new Player(this, gameWidth / 2, gameHeight - 16, "switchy");

    document.fonts.load('24px "Monogram"').then(() => {
      this.scoreText = this.add
        .text(4, 18, `SCORE: ${this.score}`, {
          fontFamily: "Monogram",
          fontSize: "16px",
          color: "#0f380f",
        })
        .setOrigin(0, 0)
        .setDepth(1000);
    });

    this.scoreTimer = this.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => {
        this.score++;
        this.scoreText.setText(`SCORE: ${this.score}`);
      },
    });

    // Collision optimizations
    // this.switchy.setCollideWorldBounds(true);
    this.physics.world.setBoundsCollision(true, true, true, true);

    // Set up keyboard controls - ensure keyboard exists
    if (this.input.keyboard) {
      this.jumpKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
    }

    this.inputBar = new InputBar(this);

    this.livesDisplay = new LivesDisplay(this);
    this.livesDisplay.updateLivesRemaining(this.player.getLives());

    this.events.on("shutdown", this.cleanup, this);
  }

  update(time: number, delta: number) {
    // Convert delta to seconds for easier calculations
    const deltaSeconds = delta / 1000;

    this.background.tilePositionY -= delta * 0.01;

    // The A key moves from center to the left of the screen
    // The D key moves from center to the right of the screen
    // Update position according to horizontal
    this.player.update(this.horizontal);

    this.obstacleTimer += delta;

    // difficulty curve
    if (this.obstacleTimer > Math.max(300, 1000 * Math.pow(0.97, this.score))) {
      this.spawnObstacle();
      this.obstacleTimer = 0;
    }

    this.obstacles = this.obstacles.filter((o) => {
      o.update(deltaSeconds);
      this.physics.world.overlap(this.player.getBody(), o.getBody(), () => {
        this.handlePlayerHit();
      });
      return o.isAlive();
    });

    this.inputBar.update(this.analogL, this.analogR);
  }

  spawnObstacle() {
    const obstacleTypes = ["paper", "mail", "stapler", "taxman", "briefcase"];
    const weights = [
      { type: "normal", weight: 100 },
      { type: "fast", weight: Math.min(this.score * 10, 40) },
      { type: "flutter", weight: Math.min(this.score * 10, 60) },
    ];
    const totalWeight = weights.reduce((acc, w) => acc + w.weight, 0);
    const roll = Phaser.Math.Between(0, totalWeight);
    let sum = 0;
    let movementType = "normal";
    for (const w of weights) {
      sum += w.weight;
      if (roll <= sum) {
        movementType = w.type;
        break;
      }
    }
    const obstacleType = Phaser.Utils.Array.GetRandom(obstacleTypes);
    const x = Phaser.Math.Between(0, this.cameras.main.width);
    const obstacle = new Obstacle(
      this,
      x,
      obstacleType,
      movementType,
      this.score
    );
    this.obstacles.push(obstacle);
  }

  handlePlayerHit() {
    if (this.player.isInvincible()) return;
    this.cameras.main.shake(200, 0.01);

    const lives = this.player.getLives();
    if (lives <= 1) {
      this.scoreTimer.remove(false);
      this.physics.pause();
      this.playWipeTransition(() =>
        this.scene.start("GameOverScene", { score: this.score })
      );
    } else {
      this.player.depleteLives();
      this.livesDisplay.updateLivesRemaining(this.player.getLives());
      this.player.startInvincibility();
    }
  }

  playWipeTransition(onComplete: () => void) {
    const wipe = this.add
      .sprite(0, 144, "screenwipe")
      .setOrigin(0, 0)
      .setDepth(1000);
    this.tweens.add({
      targets: wipe,
      y: 0,
      duration: 600,
      ease: "Linear",
      onComplete: () => {
        onComplete();
      },
    });
  }

  cleanup() {
    if (this.player) {
      this.player.destroy();
    }

    if (this.inputBar) {
      this.inputBar.destroy();
    }

    if (this.livesDisplay) {
      this.livesDisplay.destroy();
    }

    this.obstacles.forEach((o) => o.destroy());
    this.obstacles = [];
  }
}
