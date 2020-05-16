class Poof extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.POOF.key);

        this.anims.load(SPRITESHEET.POOF.animation.key);

        this.anims.play(SPRITESHEET.POOF.animation.key);

        this.setDepth(2);

        this.on('animationcomplete', () => {
            this.destroy();
        });

        scene.add.existing(this);
    }
}