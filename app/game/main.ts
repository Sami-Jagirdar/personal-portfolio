'use client';
import * as Phaser from 'phaser';
import { scenes } from './scenes';

const config = {
    width: 672,
    height: 672,
    type: Phaser.AUTO,
    scene: scenes,
    parent: "game-container",
    scale: {
        mode: Phaser.Scale.FIT, 
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 672,
        height: 672,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    render: {
        pixelArt: true,  // Keeps pixel art crisp when scaling
    }
};

const StartGame = (parent: string) => {
    return new Phaser.Game({ ...config, parent });
};

export default StartGame;