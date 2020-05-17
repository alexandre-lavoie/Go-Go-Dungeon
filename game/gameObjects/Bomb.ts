/// <reference path="./Explosion.ts" />

class Bomb extends Phaser.GameObjects.Sprite {

    public static colliders: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene, x: number, y: number, direction: Phaser.Math.Vector2) {
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

        Bomb.colliders.add(this);

        if(this.body instanceof Phaser.Physics.Arcade.Body) {
            this.body.setVelocity(direction.x, direction.y);

            this.body.setFriction(10, 10);

            this.body.setBounce(1, 1);
        }

        scene.add.existing(this);
    }
}