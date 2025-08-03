class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        const { width, height } = this.scale;

        this.loadingText = this.add.text(width / 2, height / 2, 'Загрузка...', {
            font: '24px Fira Sans',
            fill: '#ffffff'
        }).setOrigin(0.5);
    }

    create() {
        this.time.delayedCall(1000, () => {
            this.scene.start('MenuScene');
        });
    }
}

export default PreloadScene;