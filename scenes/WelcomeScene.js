import Phaser from "phaser";
import OptionsScene from "./OptionsScene";

class WelcomeScene extends Phaser.Scene {
  constructor() {
    super("WelcomeScene");
  }
  preload() {
    this.load.image("background", "/assets/spin1/welcome-bg.jpg");
    this.load.image("welcome-bg", "/assets/spin1/welcome-bg.jpg");
    this.load.image("start-bg", "/assets/spin1/start-bg.jpg");
    this.load.image("game-bg", "/assets/spin1/game-bg.jpg");
    this.load.image("option-box", "/assets/spin1/option-box.png");
    this.load.image("manu-box", "/assets/spin1/manu-box.png");
    this.load.image("btn", "/assets/spin1/btn.png");
    this.load.spritesheet("buttons", "/assets/spin1/buttons.png", {
      frameWidth: 1200 / 3,
      frameHeight: 1165 / 3,
    });

    this.load.image("icon", "/assets/icon.png");
    this.load.image("wheel", "/assets/spin1/wheel.png");
    this.load.spritesheet("wheel-cover", "/assets/spin1/wheel-cover.png", {
      frameWidth: 1996 / 6,
      frameHeight: 405,
    });
    this.load.spritesheet("foods", "/assets/spin1/foods.png", {
      frameWidth: 150,
      frameHeight: 120,
    });

    this.load.image("middle-circle", "/assets/spin1/middle-circle.png");
    this.load.image("pin", "/assets/spin1/pin.png");
    this.load.image("diamond", "/assets/spin1/diamond.png");
    this.load.image("bar", "/assets/spin1/bar.png");
  }

  create() {
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "background")
      .setScale(this.scale.width / 600, (1.25 * this.scale.height) / 1000);

    this.add
      .text(this.scale.width / 2, this.scale.height - 160, "Lucky Draw", {
        fontSize: 70,
        align: "center",
        lineSpacing: 8,
        color: "rgb(255,200,200)",
        fontFamily: "arial",
        fontStyle: "bold",
      })
      .setWordWrapWidth(600)
      .setOrigin(0.5);

    let width = this.scale.width;
    let height = this.scale.height;

    let pwidth = width - 200;
    let pheight = 10;

    let progressBox = this.add.graphics();
    let progressBar = this.add.graphics();

    progressBox.fillStyle(0x220033, 0.8);
    progressBox.fillRect(
      width / 2 - pwidth / 2,
      height - 110,
      pwidth + 4,
      pheight + 4
    );

    let time = 0;
    let timer = this.time.addEvent({
      delay: 20,
      callback: () => {
        progressBar.clear();
        progressBar.fillStyle(0xaa00dd, 1);
        progressBar.fillRect(
          width / 2 - pwidth / 2 + 2,
          height - 108,
          pwidth * time,
          pheight
        );
        // phaser = DOMStringList;
        if (time >= 1) {
          progressBar.destroy();
          progressBox.destroy();
          this.time.removeEvent(timer);
          this.scene.start("StartScene");
          this.game.scene.add("OptionsScene", new OptionsScene(), true);
        } else {
          time += 0.01;
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
}

export default WelcomeScene;
