/// <reference path="../gameObjects/Player.ts" />
/// <reference path="../gameObjects/Chest.ts" />
/// <reference path="../gameObjects/Goblin.ts" />

const menuSceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Menu',
};

class MenuScene extends Phaser.Scene {
    constructor() {
        super(menuSceneConfig);
    }

    public preload() {
        this.load.crossOrigin = "Anonymous";
        this.load.audio(AUDIO.THEME.key, AUDIO.THEME.url);
    }

    public create() {
        this.sound.stopAll();
        this.sound.add(AUDIO.THEME.key, {
            loop: true,
            volume: 0.3
        }).play();
    }

    public update() {
        
    }
}