class Healthbar extends Phaser.GameObjects.Sprite {

    public follow: Phaser.GameObjects.Sprite & {health: number};
    public hearts: Phaser.GameObjects.Sprite[];

    constructor(scene: Phaser.Scene, object: Phaser.GameObjects.Sprite & {health: number}) {
        super(scene, 0, 0, SPRITESHEET.EMPTY.key);

        this.hearts = [];

        for(let i = 0; i < object.health / 2; i++) {
            let heart = new Heart(scene, object.x, object.y);

            scene.add.existing(heart);

            this.hearts.push(heart);
        }

        object.on('destroy', () => {
            this.hearts.forEach(h => h.destroy());
            this.destroy();
        });

        this.follow = object;

        scene.add.existing(this);
    }

    public update() {
        this.hearts.forEach((h, i) => {h.setX(this.follow.x + (i - (this.hearts.length - 1) / 2) * 6); h.setY(this.follow.y - this.follow.displayHeight / 2 - 3); h.setFrame(Math.min(this.follow.health - i * 2, 2))});
    }
}