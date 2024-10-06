import "./style.css";
import Phaser from "phaser";
import WelcomeScene from "./scenes/WelcomeScene";
import StartScene from "./scenes/StartScene";
import GameScene from "./scenes/GameScene";
import WinScene from "./scenes/WinScene";
import LoseScene from "./scenes/LoseScene";

const scale = {
  width: 600,
  height: 1200,
};
if (window.innerWidth < 600 * 1.1) {
  scale.width = window.innerWidth * 0.9;
  scale.height = (scale.width * 1200) / 600;
}

const config = {
  type: Phaser.WEBGL,
  width: scale.width,
  height: scale.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [WelcomeScene, StartScene, GameScene, WinScene, LoseScene],
  initialScene: "WelcomeScene",
};

const game = new Phaser.Game(config);
