class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, height / 2, 'Вы проиграли!', {
            fontSize: '30px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const restartBtn = this.add.text(width / 2, height / 2 + 70, 'ПОВТОРИТЬ', {
            font: '24px Fira Sans',
            fill: '#ffffff',
            backgroundColor: '#009358',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({useHandCursor: true});

        restartBtn.on('pointerdown', () => {
            this.scene.start('LevelScene1');
        });
    }
}

export default GameOverScene;