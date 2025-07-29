import Phaser from "phaser";
import { InputBar } from "../InputBar";
import { AnalogKey, AnalogReport } from "../../components/ConnectDevice";

export class ScenarioScene extends Phaser.Scene {
  private inputBar!: InputBar;
  private analogL: number = 0;
  private analogR: number = 0;
  private device!: HIDDevice | undefined;

  constructor() {
    super("ScenarioScene");
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
  };

  preload() {
    this.load.image("switchy-think", "./assets/gfx/switchy-think.png");
  }

  create() {
    if (this.device) {
      this.setDevice(this.device);
    }
    const { width, height } = this.cameras.main;
    this.inputBar = new InputBar(this);
    this.add.sprite(0, height, "switchy-think").setOrigin(0, 1).setAlpha(0.2);

    document.fonts.load('16px "Monogram"').then(() => {
      this.add
        .text(
          1,
          0,
          "This game uses analog control. Help Switchy escape the Belasting- dienst by gradually pressing A & D (or UwU buttons).\nTry it out now, and then press Space/Middle to start!",
          {
            fontFamily: "Monogram",
            fontSize: "16px",
            color: "#0f380f",
          }
        )
        .setOrigin(0, 0)
        .setWordWrapWidth(width);
    });

    this.input.keyboard?.on("keydown", (event: KeyboardEvent) => {
      if ([" ", "Enter"].includes(event.key)) {
        this.scene.start("GameScene", { device: this.device });
      }
    });

    this.events.on("shutdown", this.cleanup, this);
  }

  update() {
    this.inputBar.update(this.analogL, this.analogR);
  }

  cleanup() {
    if (this.inputBar) {
      this.inputBar.destroy();
    }
  }
}
