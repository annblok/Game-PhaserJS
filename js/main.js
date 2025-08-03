import PreloadScene from 'https://annblok.github.io/Game-PhaserJS/scenes/PreloadScene.js';
import MenuScene from 'https://annblok.github.io/Game-PhaserJS/scenes/MenuScene.js';
import LevelScene1 from 'https://annblok.github.io/Game-PhaserJS/scenes/LevelScene1.js';
import LevelScene2 from 'https://annblok.github.io/Game-PhaserJS/scenes/LevelScene2.js';
import WinScene from 'https://annblok.github.io/Game-PhaserJS/scenes/WinScene.js';
import GameOverScene from 'https://annblok.github.io/Game-PhaserJS/scenes/GameOverScene.js';

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