/// <reference path="./Bomb.ts" />
/// <reference path="../utils/enums.ts" />

interface GameObjectBody {
    body: Phaser.Physics.Arcade.Body | object
}

class Player extends Phaser.GameObjects.Sprite implements GameObjectBody {

    public static readonly FULL_HEALTH = 4;
    public static colliders: Phaser.Physics.Arcade.Group;
    public static keyboard: any;
    public isMainPlayer: boolean;
    private color: string;
    private isHit: boolean;
    private isInvinsible: boolean;
    public spawn: Phaser.Math.Vector2;
    public health: number;
    public group: Phaser.GameObjects.Group;
    private bombDown: boolean;
    private slashDown: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, color: string = 'green', isMainPlayer: boolean = false) {
        super(scene, x, y, SPRITESHEET.KNIGHT[color].key);

        this.bombDown = false;

        this.slashDown = false;

        this.spawn = new Phaser.Math.Vector2(x, y);

        this.health = Player.FULL_HEALTH;

        this.color = color;

        this.group = new Phaser.GameObjects.Group(scene);

        this.group.add(this);

        this.isMainPlayer = isMainPlayer;

        this.isHit = false;

        this.isInvinsible = false;

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

        new Healthbar(scene, this);

        scene.add.existing(this);
    }

    public changeColor(color) {
        this.anims.load(SPRITESHEET.KNIGHT[color].animation.key);
        this.anims.load(SPRITESHEET.KNIGHT[color].RUN.animation.key);
        this.anims.play(SPRITESHEET.KNIGHT[color].animation.key);

        this.color = color;
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

    public heal() {
        this.health = Math.min(this.health + 1, Player.FULL_HEALTH);
    }

    public setHit() {
         if(!this.isHit && !this.isInvinsible) {
            this.health -= 1;

            if(this.health <= 0) {
                new Poof(this.scene, this.x, this.y);
    
                this.setX(this.spawn.x);
                this.setY(this.spawn.y);
    
                this.scene.sound.add(AUDIO.KNIGHT.DEATH.key, {
                    volume: 0.25
                }).play();

                if (this.body instanceof Phaser.Physics.Arcade.Body) {
                    this.scene.cameras.main.setLerp(0, 0);

                    this.scene.time.delayedCall(500, () => {
                        this.scene.cameras.main.setLerp(0.1, 0.1);
                    });

                    this.body.setVelocity(0);
                }
    
                this.health = Player.FULL_HEALTH;
            } else {
                this.isHit = true;
                this.isInvinsible = true;
    
                new Hit(this.scene, this.x, this.y);
    
                this.scene.sound.add(AUDIO.KNIGHT.HURT.key, {
                    volume: 0.25
                }).play();
        
                this.scene.time.delayedCall(200, () => {
                    this.isHit = false;
                });
    
                this.scene.time.delayedCall(500, () => {
                    this.isInvinsible = false;
                });
            }
        }
    }

    private updateControl() {
        if (this.body instanceof Phaser.Physics.Arcade.Body) {
            let gamepad = navigator.getGamepads()[0];

            if(!this.isHit) {
                if(gamepad != null) {
                    this.body.setVelocity(gamepad.axes[0] * 70, gamepad.axes[1] * 70);
                } else {
                    this.body.setVelocity(0);
                }

                let keyboard = false;
                

                if (Player.keyboard.left.isDown || Player.keyboard.leftleft.isDown) {
                    this.body.setVelocityX(-1);
                    keyboard = true;
                }
    
                if (Player.keyboard.right.isDown || Player.keyboard.rightright.isDown) {
                    this.body.setVelocityX(1);
                    keyboard = true;
                }
    
                if (Player.keyboard.up.isDown || Player.keyboard.upup.isDown) {
                    this.body.setVelocityY(-1);
                    keyboard = true;
                }
    
                if (Player.keyboard.down.isDown || Player.keyboard.downdown.isDown) {
                    this.body.setVelocityY(1);
                    keyboard = true;
                }
    
                if(keyboard) {
                    if(Player.keyboard.run.isDown) {
                        this.body.velocity.normalize().scale(90);
                    } else {
                        this.body.velocity.normalize().scale(70);
                    }
                }
            }

            if(gamepad) {
                if(gamepad.buttons[2].pressed) {
                    if(!this.bombDown) {
                        this.bombDown = true;
                        new Bomb(this.scene, this.x + 8, this.y + 8, this.body.velocity);
                    }
                } else {
                    this.bombDown = false;
                }

                if(gamepad.buttons[0].pressed) {
                    if(!this.slashDown) {
                        this.slashDown = true;
                        let direction = this.body.velocity.clone().normalize();
                        direction.scale(30);
        
                        new Slash(this.scene, this.x + 8 + direction.x, this.y + 8 + direction.y, direction);
                    }
                } else {
                    this.slashDown = false;
                }
            }

            if(this.scene.input.keyboard.checkDown(Player.keyboard.bomb, 1000)) {
                new Bomb(this.scene, this.x + 8, this.y + 8, this.body.velocity);
            }

            if (this.scene.input.keyboard.checkDown(Player.keyboard.space, 500)) {
                let direction = this.body.velocity.clone().normalize();
                direction.scale(30);

                new Slash(this.scene, this.x + 8 + direction.x, this.y + 8 + direction.y, direction);
            }
        }
    }
}