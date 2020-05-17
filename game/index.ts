/// <reference path="../node_modules/phaser/types/phaser.d.ts" />
/// <reference path="./scenes/main.ts" />
/// <reference path="./scenes/menu.ts" />

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Template',
    type: Phaser.CANVAS,
    scene: [MenuScene, GameScene],
    scale: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    parent: 'concordiamakesgames',
    backgroundColor: '#000000'
} as any;

const game = new Phaser.Game(gameConfig);