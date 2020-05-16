/// <reference path="./Bomb.ts" />
/// <reference path="../utils/enums.ts" />

interface GameObjectBody {
    body: Phaser.Physics.Arcade.Body | object
}

class Player extends Phaser.GameObjects.Sprite implements GameObjectBody {

    public static colliders: Phaser.Physics.Arcade.Group;
    public static keyboard: any;
    public isMainPlayer: boolean;
    public color: string;
    private isHit: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, color: string = 'green', isMainPlayer: boolean = false) {
        super(scene, x, y, SPRITESHEET.KNIGHT[color].key);

        this.color = color;

        this.isMainPlayer = isMainPlayer;

        this.isHit = false;

        this.anims.load(SPRITESHEET.KNIGHT[color].animation.key);

        this.anims.load(SPRITESHEET.KNIGHT[color].RUN.animation.key);

        this.anims.play(SPRITESHEET.KNIGHT[color].animation.key);

        if (this.isMainPlayer) {
            this.scene.sound.add(AUDIO.KNIGHT.SIGH.key, {
                loop: true,
                volume: 0.5,
                rate: 1.2
            }).play();
        }

        this.setDepth(1);

        Player.colliders.add(this);

        scene.add.existing(this);
    }

    public update() {
        super.update();

        if (this.isMainPlayer) {
            this.updateControl()
        }

        if (this.body instanceof Phaser.Physics.Arcade.Body && !this.isHit) {
            if (this.body.velocity.x > 0) {
                this.setFlipX(false);
            } else if (this.body.velocity.x < 0) {
                this.setFlipX(true);
            }

            if (this.body.velocity.length() > 0 && this.anims.currentAnim.key === SPRITESHEET.KNIGHT[this.color].animation.key) {
                if (this.isMainPlayer) {
                    this.scene.sound.add(AUDIO.KNIGHT.WALK.key, {
                        loop: true,
                        volume: 0.1,
                        rate: 1.3
                    }).play();
                }

                this.scene.sound.removeByKey(AUDIO.KNIGHT.SIGH.key);

                this.anims.play(SPRITESHEET.KNIGHT[this.color].RUN.animation.key);
            } else if (this.body.velocity.length() == 0 && this.anims.currentAnim.key === SPRITESHEET.KNIGHT[this.color].RUN.animation.key) {
                if (this.isMainPlayer) {
                    this.scene.sound.add(AUDIO.KNIGHT.SIGH.key, {
                        loop: true,
                        volume: 0.5,
                        rate: 1.2
                    }).play();
                }

                this.scene.sound.removeByKey(AUDIO.KNIGHT.WALK.key);

                this.anims.play(SPRITESHEET.KNIGHT[this.color].animation.key);
            }
        }
    }

    public setHit() {
        if(!this.isHit) {
            this.isHit = true;

            new Hit(this.scene, this.x, this.y);

            this.scene.sound.add(AUDIO.KNIGHT.HURT.key, {
                volume: 0.25,
                rate: 1.2
            }).play();
    
            this.scene.time.delayedCall(200, () => {
                this.isHit = false;
            });
        }
    }

    private updateControl() {
        if (this.body instanceof Phaser.Physics.Arcade.Body && !this.isHit) {
            this.body.setVelocity(0);

            if (Player.keyboard.left.isDown || Player.keyboard.leftleft.isDown) {
                this.body.setVelocityX(-1);
            }

            if (Player.keyboard.right.isDown || Player.keyboard.rightright.isDown) {
                this.body.setVelocityX(1);
            }

            if (Player.keyboard.up.isDown || Player.keyboard.upup.isDown) {
                this.body.setVelocityY(-1);
            }

            if (Player.keyboard.down.isDown || Player.keyboard.downdown.isDown) {
                this.body.setVelocityY(1);
            }

            this.body.velocity.normalize().scale(50);
        }

        if (this.scene.input.keyboard.checkDown(Player.keyboard.space, 1000)) {
            new Bomb(this.scene, this.x, this.y);
        }
    }
}