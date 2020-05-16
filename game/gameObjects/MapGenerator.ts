/// <reference path="../utils/utils.ts" />

class MapGenerator extends Phaser.GameObjects.GameObject {

    constructor(scene: Phaser.Scene) {
        super(scene, 'generator');
        this.scene = scene;
        this.generatedHub = false;
        this.generatedBoss = false;
    }

    private generatedHub: boolean;
    private generatedBoss: boolean;

    public static readonly OFFSET = 224;
    public static readonly WIDTH = 10;
    public static readonly HEIGHT = 10;

    public generate() {
        let maze = newMaze(MapGenerator.WIDTH, MapGenerator.HEIGHT);

        for(let i = 0; i < MapGenerator.WIDTH; i++) {
            for(let j = 0; j < MapGenerator.HEIGHT; j++) {
                let tile = this.getTile(maze[j][i]);

                if(tile) {
                    this.new(tile.key + getRandomInt(tile.size), i * MapGenerator.OFFSET, j * MapGenerator.OFFSET);
                }
            }
        }
    }

    private getTile(key: number[]) {
        switch(bitArrayToInt(key)) {
            case 0:
                return null;
            case 1:
                if(!this.generatedHub) {
                    this.generatedHub = true;

                    return MAP.HUB
                }

                return  MAP.DEADEND_180;
            case 2:
                return MAP.DEADEND_270;
            case 3:
                return MAP.TURN_180;
            case 4:
                if(!this.generatedBoss) {
                    this.generatedBoss = true;

                    return MAP.BOSS;
                }

                return MAP.DEADEND_0;
            case 5:
                return MAP.STRAIGHT_0;
            case 6:
                return MAP.TURN_270;
            case 7:
                return MAP.FORK_270;
            case 8:
                return MAP.DEADEND_90;
            case 9:
                return MAP.TURN_90;
            case 10:
                return MAP.STRAIGHT_180;
            case 11:
                return MAP.FORK_180;
            case 12:
                return MAP.TURN_0;
            case 13:
                return MAP.FORK_90;
            case 14:
                return MAP.FORK_0;
            case 15:
                return MAP.CROSS;
        }
    }

    public new(name, x, y) {
        let map = this.scene.add.tilemap(name, 16, 16);

        let tilemap = map.addTilesetImage(SPRITESHEET.TILEMAP.key);

        map.createStaticLayer('Background', [tilemap], x, y).setDepth(-2);

        let midground = map.createStaticLayer('Midground', [tilemap], x, y).setDepth(-1);

        map.createStaticLayer('Foreground', [tilemap], x, y).setDepth(5);

        midground.setCollisionByProperty({collides: true});

        midground.setCollision([37]);

        map.createFromObjects('Sprites', 'Goblin', {}).forEach(s => {new Goblin(this.scene, s.x + x, s.y + y); s.destroy()});

        map.createFromObjects('Sprites', 'Torch', {}).forEach(s => {new Torch(this.scene, s.x + x, s.y + y); s.destroy()});

        map.createFromObjects('Sprites', 'Chest', {}).forEach(s => {new Chest(this.scene, s.x + x, s.y + y); s.destroy()});

        map.createFromObjects('Sprites', 'Player', {}).forEach(s => {new Player(this.scene, s.x + x, s.y + y, 'white', true); s.destroy()});

        map.createFromObjects('Sprites', 'Door', {}).forEach(s => {new Door(this.scene, s.x + x, s.y + y); s.destroy()});

        map.createFromObjects('Sprites', 'Slime', {}).forEach(s => {s.destroy()});

        this.scene.physics.add.collider(Player.colliders, midground);

        this.scene.physics.add.collider(Goblin.colliders, midground);
    }
}