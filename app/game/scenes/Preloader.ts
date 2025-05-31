import {Scene} from "phaser";

const CHAR_FRAMES_PER_ROW = 9-1; // 9 frames in the spritesheet, 0-8 are valid indices

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        const progressBarWidth = this.scale.width * 0.5;

        // Outline of the bar
        this.add
            .rectangle(centerX, centerY, progressBarWidth, 32)
            .setStrokeStyle(2, 0xc0c0c0);

        // Create a gradient texture for the progress bar
        const graphics = this.make.graphics();
        graphics.fillStyle(0xd8404a); // Red color
        graphics.fillRect(0, 0, 1, 28);
        graphics.generateTexture("progress-bar-fill", 1, 28);
        graphics.destroy();

        // Progress bar itself, using the gradient texture
        const bar = this.add
            .image(centerX - progressBarWidth / 2, centerY, "progress-bar-fill")
            .setOrigin(0, 0.5);

        // Update the loading bar
        this.load.on("progress", (progress: number) => {
            bar.setScale(progressBarWidth * progress, 1);
        });
    }

    preload() {
        // Load full room
        this.load.tilemapTiledJSON("sami-room", "/sami-room.json");
        this.load.image("2_LivingRoom_Shadowless_48x48","/2_LivingRoom_Shadowless_48x48.png");
        this.load.image("14_Basement_48x48","/14_Basement_48x48.png");
        this.load.image("18_Jail_48x48","/18_Jail_48x48.png");
        this.load.image("8_Gym_48x48","/8_Gym_48x48.png");
        this.load.image("20_Japanese_interiors_48x48","/20_Japanese_interiors_48x48.png");
        this.load.image("Bedroom_Singles_Shadowless_48x48_225","/Bedroom_Singles_Shadowless_48x48_225.png");
        this.load.image("Classroom_and_Library_Singles_48x48_33","/Classroom_and_Library_Singles_48x48_33.png");
        this.load.image("Classroom_and_Library_Singles_48x48_66","/Classroom_and_Library_Singles_48x48_66.png");
        this.load.image("Halloween_Singles_48x48_188","/Halloween_Singles_48x48_188.png");
        this.load.image("Living_Room_Singles_48x48_38","/Living_Room_Singles_48x48_38.png");
        this.load.image("1_Generic_48x48","/1_Generic_48x48.png");
        this.load.image("4_Bedroom_Black_Shadow_48x48","/4_Bedroom_Black_Shadow_48x48.png")
        this.load.image("6_Music_and_sport_48x48", "/6_Music_and_sport_48x48.png");
        this.load.image("Room_Builder_48x48", "/Room_Builder_48x48.png");
        this.load.image("Room_Builder_3d_walls_48x48", "/Room_Builder_3d_walls_48x48.png");
        this.load.image("Room_Builder_Floors_48x48", "/Room_Builder_Floors_48x48.png");

        // Load character spritesheet
        this.load.spritesheet("sami", "/sami_walk.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

    }

    create() {
        // global objects like animations to create once assets have loaded
        this.createPlayerWalkAnimation();

        this.scene.start("SamiBedroom");
    }

    createPlayerWalkAnimation() {
        this.anims.create({
            key: "run-up",
            frames: this.anims.generateFrameNumbers("sami", {
                start: 0,
                end: CHAR_FRAMES_PER_ROW,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "run-left",
            frames: this.anims.generateFrameNumbers("sami", {
                start: CHAR_FRAMES_PER_ROW + 1,
                end: CHAR_FRAMES_PER_ROW * 2,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "run-down",
            frames: this.anims.generateFrameNumbers("sami", {
                start: CHAR_FRAMES_PER_ROW*2 + 1,
                end: CHAR_FRAMES_PER_ROW * 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "run-right",
            frames: this.anims.generateFrameNumbers("sami", {
                start: CHAR_FRAMES_PER_ROW*3 + 1,
                end: CHAR_FRAMES_PER_ROW * 4,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }
}