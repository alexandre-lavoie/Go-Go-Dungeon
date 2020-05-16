class Hit extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.HIT.key);

        this.anims.load(SPRITESHEET.HIT.animation.key);

        this.anims.play(SPRITESHEET.HIT.animation.key);

        this.setDepth(5);

        this.on('animationcomplete', () => {
            this.destroy();
        });

        scene.add.existing(this);
    }
}