'use client';
import * as Phaser from 'phaser';
import { scenes } from './scenes';

const config = {
    width: 504,
    height: 504,
    type: Phaser.AUTO,
    scene: scenes,
    parent: "game-container",
    scale: {
        mode: Phaser.Scale.FIT, 
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 504,
        height: 504,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    render: {
        pixelArt: true,  // Keeps pixel art crisp when scaling
    },
    input: {
        keyboard: {
            capture: [
                Phaser.Input.Keyboard.KeyCodes.UP,
                Phaser.Input.Keyboard.KeyCodes.DOWN,
                Phaser.Input.Keyboard.KeyCodes.LEFT,
                Phaser.Input.Keyboard.KeyCodes.RIGHT
            ]
        }
    }
};

const StartGame = (parent: string) => {
    return new Phaser.Game({ ...config, parent });
};

export default StartGame;