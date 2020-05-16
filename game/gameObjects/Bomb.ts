/// <reference path="./Explosion.ts" />

class Bomb extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.BOMB.key);

        this.anims.load(SPRITESHEET.BOMB.animation.key);

        this.anims.play(SPRITESHEET.BOMB.animation.key);

        this.scene.sound.play(AUDIO.BOMB.HISS.key, {
            volume: 0.3
        });

        this.setDepth(2);

        this.on('animationcomplete', () => {
            new Explosion(this.scene, this.x, this.y);
            this.destroy();
        });

        scene.add.existing(this);
    }
}