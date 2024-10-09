import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");

    this.gameOptions = {
      slices: 8,
      slicePrizes: [
        "10 Wins",
        "5 Wins",
        "45 Wins",
        "15 Wins",
        "5 Wins",
        "5 Wins",
        "25 Wins",
        "5 Wins",
      ],
      rotationTime: 5000,
    };
    this.canSpin = true;
    this.diamond = 100;
    this.results = [];
    this.bidAmmount = 0;
    this.foodSelected = 10;
    this.foods = [];
    this.bids = [];
  }

  create() {
    this.staticUnit();

    this.spinText = this.add
      .text(this.scale.width / 2, this.scale.height - 65, "Spin", {
        font: "bold 28px Arial",
        align: "center",
        color: "black",
      })
      .setOrigin(0.5)
      .setDepth(3);

    this.spinBtn = this.add
      .image(this.scale.width / 2, this.scale.height - 65, "btn")
      .setScale(0.4, 0.35);
    this.spinBtn.setInteractive({ cursor: "pointer" });
    this.spinBtn.on("pointerdown", () => {
      if (this.canSpin) {
        if (this.diamond <= 0) {
          alert("You don't have enough diamonds to spin");
        } else if (this.foodSelected < 8 && this.bidAmmount !== 0) {
          this.spinWheel();
        } else if (this.foodSelected > 8) {
          this.foodText.setColor("red");
          setTimeout(() => {
            this.foodText.setColor("white");
          }, 2000);
        } else if (this.bidAmmount == 0) {
          this.bidText.setColor("red");
          setTimeout(() => {
            this.bidText.setColor("white");
          }, 2000);
        }
      }
    });

    this.prizeText = this.add.text(
      this.scale.width / 2,
      this.scale.height - 150,
      "",
      {
        font: "bold 32px Arial",
        align: "center",
        color: "white",
      }
    );
    this.prizeText.setOrigin(0.5);

    this.selectFood();
    this.selectDiamond();
  }

  staticUnit() {
    console.log("Game");
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "game-bg")
      .setScale(0.4, 0.8)
      .setAlpha(0.5);

    this.backBtn = this.add
      .sprite(this.scale.width / 13, 40, "buttons", 1)
      .setScale(0.12)
      .setOrigin(0.5)
      .setAngle(-180);
    this.timeBtn = this.add
      .sprite(this.scale.width - 35, 40, "buttons", 5)
      .setScale(0.12)
      .setOrigin(0.5);
    this.soundBtn = this.add
      .sprite(this.scale.width - 80, 40, "buttons", 8)
      .setScale(0.12)
      .setOrigin(0.5);

    this.headingText = this.add
      .text(this.scale.width / 13 + 100, 40, "Lucky Wheel ", {
        font: "bold 28px Arial",
        align: "center",
        color: "rgb(255,220,250)",
      })
      .setOrigin(0.5);

    this.moreBtn = this.add
      .sprite(this.scale.width / 13, 95, "btn")
      .setScale(0.44, 0.22)
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" });

    this.moreText = this.add
      .text(this.scale.width / 8, 95, "More 🎮", {
        font: "bold 20px Arial",
        align: "center",
        color: "rgb(20,20,20)",
      })
      .setOrigin(0.5);
    this.moreBtn.on("pointerover", () => {
      this.moreText.setColor("white");
    });
    this.moreBtn.on("pointerout", () => {
      this.moreText.setColor("balck");
    });

    this.add.image(this.scale.width - 55, 90, "bar").setScale(0.3, 0.9);
    this.add.image(this.scale.width - 95, 90, "diamond").setScale(0.19);
    this.diamondText = this.add
      .text(this.scale.width - 55, 90, this.diamond, {
        font: "bold 24px Arial",
        align: "center",
        color: "white",
      })
      .setOrigin(0.5);

    this.anims.create({
      key: "light",
      frames: this.anims.generateFrameNumbers("wheel-cover", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.wheel = this.add
      .sprite(this.scale.width / 2, this.scale.height / 2 - 90, "wheel")
      .setScale(0.57);
    this.middleCircle = this.add
      .sprite(this.scale.width / 2, this.scale.height / 2 - 90, "middle-circle")
      .setScale(0.1);

    this.wheelCover = this.add
      .sprite(this.scale.width / 2, this.scale.height / 2 - 60, "wheel-cover")
      .setScale(0.9);
    this.wheelCover.anims.play("light");
  }

  spinWheel() {
    this.spinText.setColor("black");
    this.prizeText.setText("");
    var rounds = Phaser.Math.Between(2, 4);
    var degrees = Phaser.Math.Between(0, 360);
    var prize =
      this.gameOptions.slices -
      1 -
      Math.floor(degrees / (360 / this.gameOptions.slices));
    this.canSpin = false;
    this.tweens.add({
      targets: [this.wheel, this.middleCircle],
      angle: 360 * rounds + degrees,
      duration: this.gameOptions.rotationTime,
      ease: "Cubic.easeOut",
      callbackScope: this,
      onComplete: function (tween) {
        this.checkResult(prize);
        setTimeout(() => {
          this.canSpin = true;
          this.spinText.setColor("black");
          this.foodSelected = 10;
          this.bidAmmount = 0;
          for (let i = 0; i < this.foods.length; i++) {
            this.foods[i].setDepth(1);
          }
          for (let i = 0; i < this.bids.length; i++) {
            this.bids[i].setColor("rgb(180,180,180)");
          }
        }, 3000);
      },
    });
  }

  selectFood() {
    this.add
      .rectangle(
        this.scale.width / 2,
        (this.scale.height * 3.65) / 5,
        this.scale.width - 20,
        85,
        0x000000,
        0.4
      )
      .setDepth(2);
    this.foodText = this.add
      .text(
        this.scale.width / 2 - 50,
        (this.scale.height * 3.42) / 5,
        "Select a food",
        {
          font: "bold 18px Arial",
          align: "center",
          color: "rgb(255,250,250)",
        }
      )
      .setDepth(3);

    this.burger = this.add
      .sprite(
        (this.scale.width * 1) / 9,
        (this.scale.height * 3.69) / 5,
        "foods",
        0
      )
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        if (this.foodSelected > 8) {
          this.foodSelected = 0;
          this.burger.setDepth(3);
          this.spinTextColor();
        }
      });
    this.juice = this.add
      .sprite(
        (this.scale.width * 2) / 9,
        (this.scale.height * 3.69) / 5,
        "foods",
        1
      )
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        if (this.foodSelected > 8) {
          this.foodSelected = 1;
          this.juice.setDepth(3);
          this.spinTextColor();
        }
      });
    this.pizza = this.add
      .sprite(
        (this.scale.width * 3) / 9,
        (this.scale.height * 3.69) / 5,
        "foods",
        2
      )
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        if (this.foodSelected > 8) {
          this.foodSelected = 2;
          this.pizza.setDepth(3);
          this.spinTextColor();
        }
      });
    this.icecreem = this.add
      .sprite(
        (this.scale.width * 4) / 9,
        (this.scale.height * 3.69) / 5,
        "foods",
        3
      )
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        if (this.foodSelected > 8) {
          this.foodSelected = 3;
          this.icecreem.setDepth(3);
          this.spinTextColor();
        }
      });
    this.donut = this.add
      .sprite(
        (this.scale.width * 5) / 9,
        (this.scale.height * 3.69) / 5,
        "foods",
        4
      )
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        if (this.foodSelected > 8) {
          this.foodSelected = 4;
          this.donut.setDepth(3);
          this.spinTextColor();
        }
      });
    this.frenchFry = this.add
      .sprite(
        (this.scale.width * 6) / 9,
        (this.scale.height * 3.69) / 5,
        "foods",
        5
      )
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        if (this.foodSelected > 8) {
          this.foodSelected = 5;
          this.frenchFry.setDepth(3);
          this.spinTextColor();
        }
      });
    this.hotdog = this.add
      .sprite(
        (this.scale.width * 7) / 9,
        (this.scale.height * 3.69) / 5,
        "foods",
        6
      )
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        if (this.foodSelected > 8) {
          this.foodSelected = 6;
          this.hotdog.setDepth(3);
          this.spinTextColor();
        }
      });
    this.salad = this.add
      .sprite(
        (this.scale.width * 8) / 9,
        (this.scale.height * 3.69) / 5,
        "foods",
        7
      )
      .setScale(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        if (this.foodSelected > 8) {
          this.foodSelected = 7;
          this.salad.setDepth(3);
          this.spinTextColor();
        }
      });
    this.foods.push(this.burger);
    this.foods.push(this.juice);
    this.foods.push(this.pizza);
    this.foods.push(this.icecreem);
    this.foods.push(this.donut);
    this.foods.push(this.frenchFry);
    this.foods.push(this.hotdog);
    this.foods.push(this.salad);
  }
  selectDiamond() {
    this.bidText = this.add.text(
      this.scale.width / 13,
      (this.scale.height * 4.09) / 5,
      "Bid: ",
      {
        font: "bold 24px Arial",
        align: "center",
        color: "rgb(255,250,250)",
      }
    );
    for (let i = 0; i < 4; i++) {
      this.add
        .image(
          (this.scale.width * (i + 2) + i * 30) / 6 - 15,
          (this.scale.height * 4.16) / 5,
          "bar"
        )
        .setScale(0.24, 0.9);
      this.add
        .image(
          (this.scale.width * (i + 2) + i * 30) / 6 + 3,
          (this.scale.height * 4.16) / 5,
          "diamond"
        )
        .setScale(0.1);
    }

    this.bid10 = this.add
      .text(
        (this.scale.width * (0 + 2) + 0 * 30) / 6 - 40,
        (this.scale.height * 4.07) / 5,
        "10",
        {
          font: "bold 28px Arial",
          align: "center",
          color: "rgb(180,180,180)",
        }
      )
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        if (this.bidAmmount == 0) {
          this.bidAmmount = 10;
          this.bid10.setColor("rgb(255,255,255)");
          this.spinTextColor();
        }
      });
    this.bid20 = this.add.text(
      (this.scale.width * (1 + 2) + 1 * 30) / 6 - 40,
      (this.scale.height * 4.07) / 5,
      "20",
      {
        font: "bold 28px Arial",
        align: "center",
        color: "rgb(180,180,180)",
      }
    );
    this.bid20.setInteractive({ cursor: "pointer" });
    this.bid20.on("pointerdown", () => {
      if (this.bidAmmount == 0) {
        this.bidAmmount = 20;
        this.bid20.setColor("rgb(255,255,255)");
        this.spinTextColor();
      }
    });
    this.bid30 = this.add.text(
      (this.scale.width * (2 + 2) + 2 * 30) / 6 - 40,
      (this.scale.height * 4.07) / 5,
      "30",
      {
        font: "bold 28px Arial",
        align: "center",
        color: "rgb(180,180,180)",
      }
    );
    this.bid30.setInteractive({ cursor: "pointer" });
    this.bid30.on("pointerdown", () => {
      if (this.bidAmmount == 0) {
        this.bidAmmount = 30;
        this.bid30.setColor("rgb(255,255,255)");
        this.spinTextColor();
      }
    });
    this.bid50 = this.add.text(
      (this.scale.width * (3 + 2) + 3 * 30) / 6 - 40,
      (this.scale.height * 4.07) / 5,
      "50",
      {
        font: "bold 28px Arial",
        align: "center",
        color: "rgb(180,180,180)",
      }
    );
    this.bid50.setInteractive({ cursor: "pointer" });
    this.bid50.on("pointerdown", () => {
      if (this.bidAmmount == 0) {
        this.bidAmmount = 50;
        this.bid50.setColor("rgb(255,255,255)");
        this.spinTextColor();
      }
    });

    this.bids.push(this.bid10);
    this.bids.push(this.bid20);
    this.bids.push(this.bid30);
    this.bids.push(this.bid50);
  }

  spinTextColor() {
    if (this.foodSelected < 8 && this.bidAmmount !== 0) {
      this.spinText.setColor("rgb(255,255,255)");
    }
  }

  checkResult(prize) {
    if (prize == this.foodSelected) {
      this.diamond += this.bidAmmount;
      this.diamondText.setText(this.diamond);
      let blur = this.add
        .image(this.scale.width / 2, (this.scale.height * 2.7) / 7, "manu-box")
        .setScale(
          (this.scale.width * 0.8) / 500,
          (this.scale.height * 0.4) / 674
        )
        .setDepth(5);
      let text = this.add
        .text(
          this.scale.width / 2,
          (this.scale.height * 2.4) / 7,
          "You Win !!!",
          {
            fontSize: 40,
            align: "center",
            lineSpacing: 8,
            color: "rgb(255,250,250)",
            fontFamily: "arial",
            fontStyle: "bold",
          }
        )
        .setDepth(6)
        .setOrigin(0.5);
      let text2 = this.add
        .text(
          this.scale.width / 2 - 30,
          (this.scale.height * 3) / 7,
          this.bidAmmount * 2,
          {
            fontSize: 40,
            align: "center",
            lineSpacing: 8,
            color: "rgb(255,10,200)",
            fontFamily: "arial",
            fontStyle: "bold",
          }
        )
        .setDepth(6)
        .setOrigin(0.5);
      let diamond = this.add
        .image(
          this.scale.width / 2 + 35,
          (this.scale.height * 3) / 7,
          "diamond"
        )
        .setScale(0.2)
        .setDepth(6);

      setTimeout(() => {
        text.destroy();
        text2.destroy();
        blur.destroy();
        diamond.destroy();
      }, 3000);
    } else {
      this.diamond -= this.bidAmmount;
      this.diamondText.setText(this.diamond);
      let blur = this.add
        .image(this.scale.width / 2, (this.scale.height * 2.75) / 7, "manu-box")
        .setScale(
          (this.scale.width * 0.8) / 500,
          (this.scale.height * 0.4) / 674
        )
        .setDepth(5);
      let text = this.add
        .text(
          this.scale.width / 2,
          (this.scale.height * 2.5) / 7,
          "Better Luck",
          {
            fontSize: 40,
            align: "center",
            lineSpacing: 8,
            color: "rgb(255,250,250)",
            fontFamily: "arial",
            fontStyle: "bold",
          }
        )
        .setDepth(6)
        .setOrigin(0.5);
      let text2 = this.add
        .text(this.scale.width / 2, (this.scale.height * 3) / 7, "Next Time", {
          fontSize: 40,
          align: "center",
          lineSpacing: 8,
          color: "rgb(255,250,250)",
          fontFamily: "arial",
          fontStyle: "bold",
        })
        .setDepth(6)
        .setOrigin(0.5);

      setTimeout(() => {
        text.destroy();
        text2.destroy();
        blur.destroy();
      }, 3000);
    }
  }

  update() {}

  gameOver() {}
}

export default GameScene;
