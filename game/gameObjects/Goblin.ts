interface GameObjectBody {
    body: Phaser.Physics.Arcade.Body | object
}

class Goblin extends Phaser.GameObjects.Sprite implements GameObjectBody {

    public static colliders: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITESHEET.GOBLIN.key);

        this.anims.load(SPRITESHEET.GOBLIN.RUN.animation.key);

        this.anims.load(SPRITESHEET.GOBLIN.animation.key);

        this.anims.play(SPRITESHEET.GOBLIN.animation.key);

        this.setDepth(1);

        Goblin.colliders.add(this);

        scene.add.existing(this);
    }

    public update() {
        super.update();

        if(this.body instanceof Phaser.Physics.Arcade.Body) {
            let vector = new Phaser.Math.Vector2(Infinity, Infinity);

            Player.colliders.getChildren().forEach((e: Player) => {
                let nextVector = new Phaser.Math.Vector2(e.x - this.x, e.y - this.y);

                if(nextVector.length() < vector.length()) {
                    vector = nextVector;
                }
            });

            if(vector.length() < 100) {
                this.body.setVelocity(vector.x, vector.y);

                this.body.velocity.normalize().scale(20);
            } else {
                this.body.setVelocity(0, 0);
            }

            if(this.body.velocity.x > 0) {
                this.setFlipX(false);
            } else if(this.body.velocity.x < 0) {
                this.setFlipX(true);
            }
    
            if (this.body.velocity.length() > 0 && this.anims.currentAnim.key === SPRITESHEET.GOBLIN.animation.key) {
                this.scene.sound.play(AUDIO.GOBLIN.LAUGH.key, {
                    volume: 0.1
                });

                this.anims.play(SPRITESHEET.GOBLIN.RUN.animation.key);
            } else if(this.body.velocity.length() == 0 && this.anims.currentAnim.key === SPRITESHEET.GOBLIN.RUN.animation.key) {
                this.anims.play(SPRITESHEET.GOBLIN.animation.key);
            }
        }
    }
}