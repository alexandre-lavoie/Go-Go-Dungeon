class Explosion extends Phaser.GameObjects.Sprite {

    public static colliders: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.EXPLOSION.key);

        this.anims.load(SPRITESHEET.EXPLOSION.animation.key);

        this.anims.play(SPRITESHEET.EXPLOSION.animation.key);

        this.scene.sound.play(AUDIO.BOMB.EXPLODE.key, {
            volume: 0.2
        });

        this.setDepth(2);

        this.on('animationcomplete', () => {
            this.destroy();
        });

        Explosion.colliders.add(this);

        scene.add.existing(this);
    }
}