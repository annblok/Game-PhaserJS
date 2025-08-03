class LevelScene2 extends Phaser.Scene {
    constructor() {
        super('LevelScene2');
        this.player = null;
        this.cursors = null;
    }

    preload() {
        this.load.image('backgroundlvl2', '../assets/images/bg-2.png');
        this.load.image('land', '../assets/images/ground.png');
        this.load.image('coin', '../assets/images/coin.png');
        this.load.spritesheet('player', 'assets/images/player.png', {
            frameWidth: 136,
            frameHeight: 140
        });
        this.load.spritesheet('enemy', '../assets/images/enemy.png', {
            frameWidth: 79,
            frameHeight: 110
        });
    }

    create() {
        this.add.image(2000, 222, 'backgroundlvl2');

        // Платформы
        const platform = this.physics.add.staticGroup();
        const levelMap = [
            { x: 0, y: 380 }, { x: 120, y: 380 }, { x: 240, y: 380 }, { x: 360, y: 380 },
            { x: 480, y: 320 }, { x: 600, y: 260 }, { x: 720, y: 200 },
            { x: 840, y: 380 }, { x: 960, y: 380 }, { x: 1080, y: 380 },
            { x: 1200, y: 300 }, { x: 1320, y: 220 }, { x: 1440, y: 300 }, { x: 1560, y: 380 },
            { x: 1680, y: 380 }, { x: 1800, y: 380 }, { x: 1920, y: 380 }, { x: 2040, y: 380 },
            { x: 2160, y: 300 }, { x: 2280, y: 240 }, { x: 2400, y: 180 },
            { x: 2520, y: 240 }, { x: 2640, y: 300 }, { x: 2760, y: 360 }, { x: 2880, y: 380 },
            { x: 3000, y: 380 }, { x: 3120, y: 380 }, { x: 3240, y: 380 }, { x: 3360, y: 380 },
            { x: 3480, y: 340 }, { x: 3600, y: 300 }, { x: 3720, y: 260 }, { x: 3840, y: 220 }, { x: 3960, y: 180 }
        ];
        levelMap.forEach(pos => platform.create(pos.x, pos.y, 'land'));
        platform.children.iterate(child => child.refreshBody());

        // Игрок
        this.player = this.physics.add.sprite(100, 100, 'player').setOrigin(0.5);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platform);

        // Анимации
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 10, end: 14 }),
            frameRate: 6,
            repeat: 0
        });

        this.player.anims.play('idle', true);

        this.enemy = this.physics.add.sprite(1020, 320, 'enemy').setImmovable(true);
        this.enemy.body.allowGravity = false;
        this.physics.add.collider(this.enemy, platform);

        this.physics.add.overlap(this.player, this.enemy, this.handleEnemyCollision, null, this);

        this.anims.create({
            key: 'idleGoblin',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 17 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'dyingGoblin',
            frames: this.anims.generateFrameNumbers('enemy', { start: 18, end: 22 }),
            frameRate: 15,
            repeat: 0
        });
        
        this.enemy.anims.play('idleGoblin', true);

        // Камера
        this.cameras.main.setBounds(0, 0, 4000, 400);
        this.physics.world.setBounds(0, 0, 4000, 400);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        // Клавиши
        this.cursors = this.input.keyboard.createCursorKeys();

        // Счёт
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Счет: 0', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setScrollFactor(0);

        // Монетки
        this.coins = this.physics.add.group({
            key: 'coin',
            repeat: 10,
            setXY: { x: 300, y: 0, stepX: 300 }
        });

        this.coins.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
        });

        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.collider(this.coins, platform);
    }

    update() {
        const player = this.player;
        const cursors = this.cursors;
        if (!player || !cursors) return;

        player.setVelocityX(0);

        if (cursors.left.isDown) {
            player.setVelocityX(-200);
            if (player.body.blocked.down) {
                player.anims.play('walk', true);
            }
            player.flipX = true;
        } else if (cursors.right.isDown) {
            player.setVelocityX(200);
            if (player.body.blocked.down) {
                player.anims.play('walk', true);
            }
            player.flipX = false;
        } else {
            if (player.body.blocked.down) {
                player.anims.play('idle', true);
            }
        }

        if (cursors.up.isDown && player.body.blocked.down) {
            player.setVelocityY(-500);
            player.anims.play('jump', true);
        }

        if (!this.levelEnded && this.player.x >= 3700) {
            this.levelEnded = true;
            let remainingCoins = this.coins.countActive(true);
            console.log('Конец уровня! Осталось монет:', remainingCoins);

            if (remainingCoins === 0) {
                this.scene.start('WinScene', {score: this.score});
            } else {
                this.scene.start('GameOverScene');
            }
        }
    }

    collectCoin(player, coin) {
        coin.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText('Счет: ' + this.score);
    }

    handleEnemyCollision(player, enemy) {
        const isAttacking = player.body.velocity.y > 0 && player.y < enemy.y;
        if (isAttacking) {
            enemy.body.enable = false;
    
            enemy.anims.play('dyingGoblin', true);
    
            player.setVelocityY(-300);
    
            enemy.on('animationcomplete', function (animation) {
                if (animation.key === 'dyingGoblin') {
                    enemy.disableBody(true, true);
                }
            }, this);
        }
    }
}

export default LevelScene2;
