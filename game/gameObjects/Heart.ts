class Heart extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.HEART.key);

        this.setDepth(3);

        scene.add.existing(this);
    }
}