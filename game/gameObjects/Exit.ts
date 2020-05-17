class Exit extends Phaser.GameObjects.Sprite {

    public static colliders: Phaser.Physics.Arcade.StaticGroup;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.EXIT.key);

        this.setDepth(-1);

        this.on('animationcomplete', () => {
            this.destroy();
        });

        Exit.colliders.add(this);

        scene.add.existing(this);
    }
}