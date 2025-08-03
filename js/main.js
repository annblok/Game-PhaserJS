import PreloadScene from 'scenes/PreloadScene.js';
import MenuScene from 'scenes/MenuScene.js';
import LevelScene1 from 'scenes/LevelScene1.js';
import LevelScene2 from 'scenes/LevelScene2.js';
import WinScene from 'scenes/WinScene.js';
import GameOverScene from 'scenes/GameOverScene.js';

const config = {
    type: Phaser.AUTO,
    width: 700,
    height: 445,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 }, 
            debug: false 
        }
    },
    scene: [PreloadScene, MenuScene, LevelScene1, LevelScene2, WinScene, GameOverScene]
};

new Phaser.Game(config);