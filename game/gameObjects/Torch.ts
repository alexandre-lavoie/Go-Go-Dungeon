class Torch extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.TORCH.key);

        this.anims.load(SPRITESHEET.TORCH.animation.key);

        this.anims.play(SPRITESHEET.TORCH.animation.key);

        this.setDepth(1);

        scene.add.existing(this);
    }
}