/// <reference path="./Explosion.ts" />

class Chest extends Phaser.GameObjects.Sprite {

    public static colliders: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.CHEST.key);

        this.anims.load(SPRITESHEET.CHEST.animation.key);

        this.anims.load(SPRITESHEET.CHEST.OPEN.animation.key);

        this.anims.play(SPRITESHEET.CHEST.animation.key);

        Chest.colliders.add(this);

        scene.add.existing(this);
    }

    public open() {
        if(this.anims.currentAnim.key == SPRITESHEET.CHEST.animation.key && this.body instanceof Phaser.Physics.Arcade.Body) {
            this.anims.play(SPRITESHEET.CHEST.OPEN.animation.key);
            this.scene.sound.play(AUDIO.COLLECT.key, {
                volume: 0.75
            });
            Chest.colliders.remove(this);
            this.body.destroy();
        }
    }
}