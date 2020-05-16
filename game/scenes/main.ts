/// <reference path="../gameObjects/Player.ts" />
/// <reference path="../gameObjects/Chest.ts" />
/// <reference path="../gameObjects/Goblin.ts" />

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            active: false,
            visible: false,
            key: 'Game',
        } as Phaser.Types.Scenes.SettingsConfig);
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

        this.physics.add.collider(Player.colliders, Goblin.colliders, (player: Player, goblin: Goblin) => {
            if (player.body instanceof Phaser.Physics.Arcade.Body) {
                let direction = new Phaser.Math.Vector2(player.x - goblin.x, player.y - goblin.y).normalize().scale(100);

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

        this.physics.add.collider(Goblin.colliders, Goblin.colliders);

        this.physics.add.overlap(Chest.colliders, Player.colliders, () => { }, (chest: Chest, _) => {
            chest.open();
        });

        this.physics.add.overlap(Goblin.colliders, Explosion.colliders, () => { }, (goblin: Goblin, _) => {
            new Poof(this, goblin.x, goblin.y);
            this.sound.play(AUDIO.GOBLIN.DEATH.key, {
                volume: 0.5
            });
            goblin.destroy();
        });

        this.physics.add.collider(Player.colliders, Door.colliders);

        this.physics.add.collider(Goblin.colliders, Door.colliders);

        this.physics.add.collider(Door.colliders, Explosion.colliders, () => {}, (door: Door, explosion: Explosion) => {
            door.open();
        });
    }

    public create() {
        this.sound.add(AUDIO.THEME.key, {
            loop: true,
            volume: 0.3
        }).play();

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
            'space': Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        let mapGenerator = new MapGenerator(this);

        mapGenerator.generate();

        this.cameras.main.setZoom(10);

        this.cameras.main.startFollow(Player.colliders.children.entries[0]);
    }

    public update() {
        Player.colliders.children.iterate(e => e.update());
        Goblin.colliders.children.iterate(e => e.update());
    }
}