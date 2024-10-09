import Phaser from "phaser";

class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  create() {
    this.optionsScene = this.scene.get("OptionsScene");
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "manu-box")
      .setScale(this.scale.width / 500, (this.scale.height * 1.15) / 674);

    this.add
      .text(this.scale.width / 2, 180, "Welcome", {
        fontSize: 50,
        align: "center",
        lineSpacing: 8,
        color: "rgb(255,10,200)",
        fontFamily: "arial",
        fontStyle: "bold",
      })
      .setWordWrapWidth(600)
      .setOrigin(0.5);
    this.add
      .text(this.scale.width / 2, 260, "Play and win the prize!!!", {
        fontSize: 30,
        align: "center",
        lineSpacing: 8,
        color: "white",
        fontFamily: "arial",
        fontStyle: "bold",
      })
      .setWordWrapWidth(600)
      .setOrigin(0.5);
    this.btn = this.add
      .image(this.scale.width / 2, this.scale.height - 120, "btn")
      .setScale(0.4);
    this.playText = this.add
      .text(this.scale.width / 2, this.scale.height - 120, "Play", {
        fontSize: 30,
        align: "center",
        lineSpacing: 8,
        color: "black",
        fontFamily: "arial",
        fontStyle: "bold",
      })
      .setWordWrapWidth(600)
      .setOrigin(0.5);
    this.btn.on("pointerover", () => {
      this.playText.setColor("white");
    });
    this.btn.on("pointerout", () => {
      this.playText.setColor("balck");
    });

    this.btn.setInteractive({ cursor: "pointer" });
    this.btn.on("pointerdown", () => {
      this.scene.stop();
      this.scene.start("GameScene");
    });
    this.scene.start("GameScene");
  }

  update() {}
}

export default StartScene;
