class Slash extends Phaser.GameObjects.Sprite {

    public static colliders: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene, x: number, y: number, direction: Phaser.Math.Vector2) {
        super(scene, x, y, SPRITESHEET.SLASH.key);

        this.anims.load(SPRITESHEET.SLASH.animation.key);

        this.anims.play(SPRITESHEET.SLASH.animation.key);

        this.setRotation(direction.angle());

        this.setDepth(5);

        this.on('animationcomplete', () => {
            this.destroy();
        });

        this.scene.sound.play(AUDIO.SLASH.key, {
            volume: 0.2
        });

        Slash.colliders.add(this);

        scene.add.existing(this);
    }
}