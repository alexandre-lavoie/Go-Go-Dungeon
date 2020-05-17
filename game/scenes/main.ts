/// <reference path="../gameObjects/Player.ts" />
/// <reference path="../gameObjects/Chest.ts" />
/// <reference path="../gameObjects/Goblin.ts" />

class GameScene extends Phaser.Scene {

    public chestCollected: number;
    public totalChest: number;
    public totalGoblin: number;
    public goblinKilled: number;
    public startTime: number;

    constructor() {
        super({
            active: false,
            visible: false,
            key: 'Game',
        } as Phaser.Types.Scenes.SettingsConfig);

        this.chestCollected = 0;
        this.totalChest = 0;
        this.totalGoblin = 0;
        this.goblinKilled = 0;
    }

    private preloadSpriteSheets() {
        let queue: any = [];
        let nextQueue: any = Object.values(SPRITESHEET);

        while (nextQueue.length > 0) {
            queue = nextQueue;
            nextQueue = [];

            queue.forEach(v => {
                this.load.spritesheet(v.key, v.url, v.frameConfig);

                let copy = { ...v };

                delete copy.key;
                delete copy.url;
                delete copy.animation;
                delete copy.frameConfig;

                nextQueue = [...nextQueue, ...Object.values(copy)];
            });
        }
    }

    private preloadAudio() {
        let queue: any = [];
        let nextQueue: any = Object.values(AUDIO);

        while (nextQueue.length > 0) {
            queue = nextQueue;
            nextQueue = [];

            queue.forEach(v => {
                let copy = { ...v };

                if (v.key && v.url) {
                    this.load.audio(v.key, v.url);

                    delete copy.key;
                    delete copy.url;
                }

                nextQueue = [...nextQueue, ...Object.values(copy)];
            });
        }
    }

    private preloadMaps() {
        Object.values(MAP).forEach((value) => {
            for (let i = 0; i < value.size; i++) {
                this.load.tilemapTiledJSON(value.key + i, `${value.assetFolder}${i}.json`)
            }
        });
    }

    public preload() {
        this.startTime = this.time.now;

        this.preloadSpriteSheets();

        this.preloadAudio();

        this.preloadMaps();
    }

    public createAnimations() {
        let queue: any = [];
        let nextQueue: any = Object.values(SPRITESHEET);

        while (nextQueue.length > 0) {
            queue = nextQueue;
            nextQueue = [];

            queue.forEach(v => {
                this.anims.create({ ...v.animation, frames: this.anims.generateFrameNumbers(v.key, {}) });

                let copy = { ...v };

                delete copy.key;
                delete copy.url;
                delete copy.animation;
                delete copy.frameConfig;

                nextQueue = [...nextQueue, ...Object.values(copy)];
            });
        }
    }

    public initColliders() {
        Player.colliders = this.physics.add.group();

        Goblin.colliders = this.physics.add.group();

        Explosion.colliders = this.physics.add.group();

        Chest.colliders = this.physics.add.group();

        Door.colliders = this.physics.add.staticGroup();

        Bomb.colliders = this.physics.add.group();

        Slash.colliders = this.physics.add.group();

        Slime.colliders = this.physics.add.staticGroup();

        Exit.colliders = this.physics.add.staticGroup();

        this.physics.add.collider(Player.colliders, Goblin.colliders, (player: Player, goblin: Goblin) => {
            if (player.body instanceof Phaser.Physics.Arcade.Body) {
                let direction = new Phaser.Math.Vector2(player.x - goblin.x, player.y - goblin.y).normalize().scale(100);

                player.setHit();

                player.body.setVelocity(direction.x, direction.y);
            }
        });

        this.physics.add.collider(Player.colliders, Slime.colliders, (player: Player, slime: Slime) => {
            if (player.body instanceof Phaser.Physics.Arcade.Body) {
                let direction = new Phaser.Math.Vector2(player.x - slime.x, player.y - slime.y).normalize().scale(100);

                player.setHit();

                player.body.setVelocity(direction.x, direction.y);
            }
        });

        this.physics.add.overlap(Player.colliders, Explosion.colliders, (player: Player, explosion: Explosion) => {
            if (player.body instanceof Phaser.Physics.Arcade.Body) {
                let direction = new Phaser.Math.Vector2(player.x - explosion.x, player.y - explosion.y).normalize().scale(200);

                player.setHit();

                player.body.setVelocity(direction.x, direction.y);
            }
        });

        let gameEnded = false;

        this.physics.add.collider(Player.colliders, Exit.colliders, () => {
            if(!gameEnded) {
                gameEnded = true;

                this.time.delayedCall(1000, () => {
                    this.sound.stopAll();
                    this.sound.add(AUDIO.THEME.key, {
                        loop: true,
                        volume: 0.3
                    }).play();
                    this.game.scene.stop('Game');
                });

                /// @ts-ignore
                $('.overlay').removeClass('out');
                /// @ts-ignore
                $('#main-menu').hide();
                /// @ts-ignore
                $('#score-menu').show();
                // @ts-ignore
                $('#chest-found').html(this.chestCollected);
                // @ts-ignore
                $('#chest-total').html(this.totalChest);
                // @ts-ignore
                $('#goblin-killed').html(this.goblinKilled);
                // @ts-ignore
                $('#goblin-total').html(this.totalGoblin);
                // @ts-ignore
                $('#time').html(Math.floor(this.time.now - this.startTime));
            }
        });

        this.physics.add.collider(Goblin.colliders, Goblin.colliders);

        this.physics.add.collider(Goblin.colliders, Slime.colliders);

        this.physics.add.collider(Goblin.colliders, Slash.colliders, () => {}, (goblin: Goblin, _) => {
            new Poof(this, goblin.x, goblin.y);
            this.sound.play(AUDIO.GOBLIN.DEATH.key, {
                volume: 0.5
            });
            this.goblinKilled += 1;
            goblin.destroy();
        });

        this.physics.add.collider(Slime.colliders, Slash.colliders, () => {}, (slime: Slime, slash: Slash) => {
            slime.health--;
            
            new Hit(this, slash.x, slash.y);

            slash.destroy();

            if(slime.health <= 0) {
                new Poof(this, slime.x, slime.y);

                this.sound.play(AUDIO.SLIME.DEATH.key, {
                    volume: 0.5
                });

                slime.destroy();
            } else {
                this.sound.play(AUDIO.SLIME.HIT.key, {
                    volume: 0.5
                });
            }
        });

        this.physics.add.collider(Slime.colliders, Explosion.colliders, () => {}, (slime: Slime, explosion: Explosion) => {
            slime.health--;
            
            new Hit(this, slime.x, slime.y);

            if(slime.health <= 0) {
                new Poof(this, slime.x, slime.y);

                this.sound.play(AUDIO.SLIME.DEATH.key, {
                    volume: 0.5
                });

                slime.destroy();
            } else {
                this.sound.play(AUDIO.SLIME.HIT.key, {
                    volume: 0.5
                });
            }
        });

        this.physics.add.overlap(Chest.colliders, Player.colliders, () => { }, (chest: Chest, player: Player) => {
            chest.open();
            player.heal();
            this.chestCollected += 1;
        });

        this.physics.add.overlap(Goblin.colliders, Explosion.colliders, () => { }, (goblin: Goblin, _) => {
            new Poof(this, goblin.x, goblin.y);
            this.sound.play(AUDIO.GOBLIN.DEATH.key, {
                volume: 0.5
            });
            this.goblinKilled += 1;
            goblin.destroy();
        });

        this.physics.add.collider(Player.colliders, Door.colliders);

        this.physics.add.collider(Goblin.colliders, Door.colliders);

        this.physics.add.collider(Door.colliders, Explosion.colliders, () => {}, (door: Door, explosion: Explosion) => {
            door.open();
        });
    }

    public create() {
        this.createAnimations();

        this.initColliders();

        Player.keyboard = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'upup': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'downdown': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'leftleft': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'rightright': Phaser.Input.Keyboard.KeyCodes.D,
            'space': Phaser.Input.Keyboard.KeyCodes.SPACE,
            'bomb': Phaser.Input.Keyboard.KeyCodes.E,
            'run': Phaser.Input.Keyboard.KeyCodes.SHIFT
        });

        let mapGenerator = new MapGenerator(this);
        mapGenerator.generate();

        this.cameras.main.setZoom(8);

        this.cameras.main.startFollow(Player.colliders.children.entries[0]);

        this.cameras.main.setLerp(0.1, 0.1);
    }

    public update() {
        this.children.each(e => e.update());
    }
}