class Slime extends Phaser.GameObjects.Sprite {

    public static colliders: Phaser.Physics.Arcade.StaticGroup;

    public health: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.SLIME.key);

        this.anims.load(SPRITESHEET.SLIME.animation.key);

        this.anims.play(SPRITESHEET.SLIME.animation.key);

        this.setScale(3, 3);

        this.setDepth(2);

        this.health = 30;

        new Healthbar(scene, this);

        Slime.colliders.add(this);

        scene.add.existing(this);
    }
}