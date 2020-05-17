interface ISpriteSheet extends Phaser.Types.Loader.FileTypes.SpriteSheetFileConfig {
    animation?: Phaser.Types.Animations.Animation
    [key: string]: ISpriteSheet | any
}

const SPRITESHEET: {[key: string]: ISpriteSheet} = {
    CHEST: {
        key: "CHEST",
        url: './assets/chest/spritesheet.png',
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16
        },
        animation: {
            key: "chest",
            frameRate: 10,
            repeat: -1,
            delay: 2000,
            repeatDelay: 2000,
        },
        OPEN: {
            key: "CHEST_OPEN",
            url: './assets/chest/open.png',
            frameConfig: {
                frameWidth: 16,
                frameHeight: 16
            },
            animation: {
                key: "chest_open",
                frameRate: 0
            }
        }
    },

    KNIGHT: {
        key: `KNIGHT`,
        animation: {
            key: `knight`,
            frameRate: 5,
            repeat: -1,
        },
        url: `./assets/knight/idle_spritesheet_white.png`,
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16,
        },
        RUN: {
            key: `KNIGHT_RUN`,
            url: `./assets/knight/run_spritesheet_white.png`,
            frameConfig: {
                frameWidth: 16,
                frameHeight: 16,
            },
            animation: {
                key: `knight_run`,
                frameRate: 10,
                repeat: -1
            }
        }
    },

    GOBLIN: {
        key: "GOBLIN",
        animation: {
            key: "goblin",
            frameRate: 10,
            repeat: -1,
        },
        url: './assets/goblin/idle_spritesheet.png',
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16
        },
        RUN: {
            key: "GOBLIN_RUN",
            url: './assets/goblin/run_spritesheet.png',
            frameConfig: {
                frameWidth: 16,
                frameHeight: 16
            },
            animation: {
                key: "goblin_run", 
                frameRate: 10,
                repeat: -1
            }
        }
    },

    SLIME: {
        key: "SLIME",
        animation: {
            key: "slime",
            frameRate: 10,
            repeat: -1
        },
        url: './assets/slime/spritesheet.png',
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16
        },
    },

    BOMB: {
        key: "BOMB",
        animation: {
            key: "bomb_tick",
            frameRate: 10
        },
        url: './assets/weapon/bomb_spritesheet.png',
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16
        },
    },

    EXPLOSION: {
        key: "EXPLOSION",
        url: './assets/effects/explosion_spritesheet.png',
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32
        },
        animation: {
            key: "explode",
            frameRate: 10
        }
    },

    TORCH: {
        key: "TORCH",
        url: './assets/torch/spritesheet.png',
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16
        },
        animation: {
            key: "torch",
            frameRate: 5,
            repeat: -1
        }
    },

    POOF: {
        key: "POOF",
        url: './assets/effects/poof_spritesheet.png',
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16
        },
        animation: {
            key: "poof",
            frameRate: 5
        }
    },

    TILEMAP: {
        key: "tilemap",
        url: './assets/tilemap.png',
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16
        }
    },

    HIT: {
        key: "HIT",
        url: "./assets/effects/hit_spritesheet.png",
        frameConfig: {
            frameWidth: 8,
            frameHeight: 8
        },
        animation: {
            key: "hit",
            frameRate: 10
        }
    },

    SLASH: {
        key: "SLASH",
        url: "./assets/effects/slash_spritesheet.png",
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16
        },
        animation: {
            key: "slash",
            frameRate: 10
        }
    },

    EXIT: {
        key: "EXIT",
        url: "./assets/exit/sprite.png",
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16
        },
    },

    HEART: {
        key: "HEART",
        url: "./assets/heart/spritesheet.png",
        frameConfig: {
            frameWidth: 5,
            frameHeight: 5
        },
    },

    EMPTY: {
        key: "EMPTY",
        url: "./assets/misc/empty.png",
        frameConfig: {
            frameWidth: 1,
            frameHeight: 1
        },
    },

    DOOR: {
        key: "DOOR",
        url: "./assets/door/closed.png",
        frameConfig: {
            frameWidth: 32,
            frameHeight: 32
        },
        animation: {
            key: "door",
            frameRate: 0
        },
        OPEN: {
            key: "DOOR_OPEN",
            url: "./assets/door/open_spritesheet.png",
            frameConfig: {
                frameWidth: 32,
                frameHeight: 32
            },
            animation: {
                key: "door_open",
                frameRate: 10
            }
        }
    }
};

['red', 'blue', 'green', 'yellow', 'white'].forEach(color => {
    SPRITESHEET.KNIGHT[color] = {
        key: `KNIGHT_${color.toUpperCase()}`,
        animation: {
            key: `knight_${color}`,
            frameRate: 5,
            repeat: -1,
        },
        url: `./assets/knight/idle_spritesheet_${color}.png`,
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16,
        },
        RUN: {
            key: `KNIGHT_${color.toUpperCase()}_RUN`,
            url: `./assets/knight/run_spritesheet_${color}.png`,
            frameConfig: {
                frameWidth: 16,
                frameHeight: 16,
            },
            animation: {
                key: `knight_${color}_run`,
                frameRate: 10,
                repeat: -1
            }
        }
    }
})

const AUDIO = {
    THEME: {
        key: "theme",
        url: './assets/sound/theme.mp3'
    },
    KNIGHT: {
        SIGH: {
            key: "knight_sigh",
            url: './assets/sound/knight/sigh.mp3'
        },
        WALK: {
            key: "knight_walk",
            url: "./assets/sound/knight/walk.mp3"
        },
        HURT: {
            key: "knight_hurt",
            url: './assets/sound/knight/hurt.mp3'
        },
        DEATH: {
            key: "knight_death",
            url: './assets/sound/knight/death.mp3'
        }
    },
    GOBLIN: {
        LAUGH: {
            key: "goblin_laugh",
            url: './assets/sound/goblin/laugh.mp3'
        },
        DEATH: {
            key: "goblin_death",
            url: './assets/sound/goblin/death.mp3'
        }
    },
    BOMB: {
        HISS: {
            key: "bomb_hiss",
            url: './assets/sound/bomb/hiss.mp3'
        },
        EXPLODE: {
            key: "bomb_explode",
            url: './assets/sound/bomb/explode.mp3'
        }
    },

    COLLECT: {
        key: "collect",
        url: "./assets/sound/misc/collect.mp3"
    },

    SLASH: {
        key: 'slash',
        url: "./assets/sound/misc/slash.mp3"
    },

    SLIME: {
        HIT: {
            key: 'slime_hit',
            url: './assets/sound/slime/hit.mp3'
        },
        DEATH: {
            key: 'slime_death',
            url: './assets/sound/slime/death.mp3'
        }
    }
}

const MAP = {
    TURN_0: {
        key: "turn_0_",
        assetFolder: './assets/maps/turn/0/',
        size: 1
    },

    TURN_90: {
        key: "turn_90_",
        assetFolder: './assets/maps/turn/90/',
        size: 1
    },

    TURN_180: {
        key: "turn_180_",
        assetFolder: './assets/maps/turn/180/',
        size: 1
    },

    TURN_270: {
        key: "turn_270_",
        assetFolder: './assets/maps/turn/270/',
        size: 1
    },

    FORK_0: {
        key: "fork_0_",
        assetFolder: './assets/maps/fork/0/',
        size: 1
    },

    FORK_90: {
        key: "fork_90_",
        assetFolder: './assets/maps/fork/90/',
        size: 1
    },

    FORK_180: {
        key: "fork_180_",
        assetFolder: './assets/maps/fork/180/',
        size: 1
    },

    FORK_270: {
        key: "fork_270_",
        assetFolder: './assets/maps/fork/270/',
        size: 2
    },

    STRAIGHT_0: {
        key: "straight_0_",
        assetFolder: './assets/maps/straight/0/',
        size: 2
    },

    STRAIGHT_180: {
        key: "straight_180_",
        assetFolder: './assets/maps/straight/180/',
        size: 1
    },

    CROSS: {
        key: "cross_",
        assetFolder: './assets/maps/cross/',
        size: 2
    },

    DEADEND_0: {
        key: "deadend_0_",
        assetFolder: './assets/maps/deadend/0/',
        size: 1
    },

    DEADEND_90: {
        key: "deadend_90_",
        assetFolder: './assets/maps/deadend/90/',
        size: 1
    },

    DEADEND_180: {
        key: "deadend_180_",
        assetFolder: './assets/maps/deadend/180/',
        size: 1
    },

    DEADEND_270: {
        key: "deadend_270_",
        assetFolder: './assets/maps/deadend/270/',
        size: 1
    },

    BOSS_0: {
        key: "boss_0_",
        assetFolder: './assets/maps/boss/0/',
        size: 1
    },

    BOSS_90: {
        key: "boss_90_",
        assetFolder: './assets/maps/boss/90/',
        size: 1
    },

    BOSS_180: {
        key: "boss_180_",
        assetFolder: './assets/maps/boss/180/',
        size: 1
    },

    BOSS_270: {
        key: "boss_270_",
        assetFolder: './assets/maps/boss/270/',
        size: 1
    },

    HUB_0: {
        key: "hub_0_",
        assetFolder: './assets/maps/hub/0/',
        size: 1
    },

    HUB_180: {
        key: "hub_180_",
        assetFolder: './assets/maps/hub/180/',
        size: 1
    },

    HUB_90: {
        key: "hub_90_",
        assetFolder: './assets/maps/hub/90/',
        size: 1
    },

    HUB_270: {
        key: "hub_270_",
        assetFolder: './assets/maps/hub/270/',
        size: 1
    }
}