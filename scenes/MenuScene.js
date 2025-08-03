class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.image('bgMenu', 'assets/images/bg-3.png');
    }

    create() {
        const { width, height } = this.scale;

        this.add.image(width / 2, 222, 'bgMenu');

        const startBtn = this.add.text(width / 2, height / 2, 'НАЧАТЬ ИГРУ', {
            font: '24px Fira Sans',
            fill: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({useHandCursor: true});

        startBtn.on('pointerdown', () => {
            this.scene.start('LevelScene1');
        });
    }
}

export default MenuScene;