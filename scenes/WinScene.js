class WinScene extends Phaser.Scene {
    constructor() {
        super('WinScene');
    }

    create(data) {
        const { width, height } = this.scale;

        this.add.text(width / 2, height / 2, 'Победа!', {
            fontSize: '30px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 + 50, `Монет собрано: ${data.score}`, {
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const restartBtn = this.add.text(width / 2, height / 2 + 100, 'ИГРАТЬ ДАЛЬШЕ', {
            font: '24px Fira Sans',
            fill: '#ffffff',
            backgroundColor: '#009358',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({useHandCursor: true});

        restartBtn.on('pointerdown', () => {
            this.scene.start('LevelScene2');
        });
    }
}

export default WinScene;