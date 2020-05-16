class Door extends Phaser.GameObjects.Sprite {

    public static colliders: Phaser.Physics.Arcade.StaticGroup;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.DOOR.key);

        this.anims.load(SPRITESHEET.DOOR.animation.key);

        this.anims.load(SPRITESHEET.DOOR.OPEN.animation.key);

        this.anims.play(SPRITESHEET.DOOR.animation.key);

        this.setDepth(5);

        Door.colliders.add(this);
        scene.add.existing(this);
    }

    public open() {
        if(this.anims.currentAnim.key == SPRITESHEET.DOOR.animation.key && this.body instanceof Phaser.Physics.Arcade.StaticBody) {
            this.anims.play(SPRITESHEET.DOOR.OPEN.animation.key);
            Door.colliders.remove(this);
            this.body.destroy();
        }
    }
}