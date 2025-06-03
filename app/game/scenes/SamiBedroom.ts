import assert from "assert";
import { Scene } from "phaser";
import { MainPlayer } from "../components/MainPlayer";
import { EventBus } from "../EventBus";

export interface InteractionData {
    name: string;
    route: string;
}

class SamiBedroom extends Scene {
    player: MainPlayer | null;
    mizu: Phaser.GameObjects.Sprite | null;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | null;
    interactionPrompt: Phaser.GameObjects.Text | null;
    eKey: Phaser.Input.Keyboard.Key | null;
    currentInteraction: InteractionData | null;

    constructor() {
        super("SamiBedroom");
        this.player = null;
        this.mizu = null;
        this.cursors = null;
        this.interactionPrompt = null;
        this.eKey = null;
        this.currentInteraction = null;
        
    }

    init() {
        // Nothing for now
    }

    create() {

        // First load tilemap
        const map = this.make.tilemap({
            key: "sami-room",
            tileWidth: 48,
            tileHeight: 48,
        });

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // this.cameras.main.setZoom(0.75);

        // Add the tileset images - the tiled map was created a bit inefficiently resulting in many tilesets for the same room
        const genericTiles = map.addTilesetImage("1_Generic_48x48", "1_Generic_48x48");
        const livingRoomTiles = map.addTilesetImage("2_LivingRoom_Shadowless_48x48", "2_LivingRoom_Shadowless_48x48");
        const basementTiles = map.addTilesetImage("14_Basement_48x48", "14_Basement_48x48");
        const jailTiles = map.addTilesetImage("18_Jail_48x48", "18_Jail_48x48");
        const gymTiles = map.addTilesetImage("8_Gym_48x48", "8_Gym_48x48");
        const japaneseInteriorsTiles = map.addTilesetImage("20_Japanese_interiors_48x48", "20_Japanese_interiors_48x48");
        const bedroomSinglesTiles = map.addTilesetImage("Bedroom_Singles_Shadowless_48x48_225", "Bedroom_Singles_Shadowless_48x48_225");
        const classroomAndLibraryTiles1 = map.addTilesetImage("Classroom_and_Library_Singles_48x48_33", "Classroom_and_Library_Singles_48x48_33");
        const classroomAndLibraryTiles2 = map.addTilesetImage("Classroom_and_Library_Singles_48x48_66", "Classroom_and_Library_Singles_48x48_66");
        const halloweenTiles = map.addTilesetImage("Halloween_Singles_48x48_188", "Halloween_Singles_48x48_188");
        const livingRoomSinglesTiles = map.addTilesetImage("Living_Room_Singles_48x48_38", "Living_Room_Singles_48x48_38");
        const bedroomTiles = map.addTilesetImage("4_Bedroom_Black_Shadow_48x48", "4_Bedroom_Black_Shadow_48x48");
        const musicAndSportTiles = map.addTilesetImage("6_Music_and_sport_48x48", "6_Music_and_sport_48x48");
        const roomBuilderTiles = map.addTilesetImage("Room_Builder_48x48", "Room_Builder_48x48");
        const roomBuilder3DTiles = map.addTilesetImage("Room_Builder_3d_walls_48x48", "Room_Builder_3d_walls_48x48");
        const roomBuilderFloorsTiles = map.addTilesetImage("Room_Builder_Floors_48x48", "Room_Builder_Floors_48x48");
        assert(bedroomTiles && roomBuilderTiles && roomBuilder3DTiles && roomBuilderFloorsTiles && musicAndSportTiles && basementTiles && jailTiles && gymTiles && japaneseInteriorsTiles && genericTiles && livingRoomTiles && classroomAndLibraryTiles1 && classroomAndLibraryTiles2 && halloweenTiles && livingRoomSinglesTiles && bedroomSinglesTiles, "All tilesets must be loaded correctly");
        const allTiles = [
            bedroomTiles,
            roomBuilderTiles,
            roomBuilder3DTiles,
            roomBuilderFloorsTiles,
            musicAndSportTiles,
            basementTiles,
            jailTiles,
            gymTiles,
            japaneseInteriorsTiles,
            genericTiles,
            livingRoomTiles,
            classroomAndLibraryTiles1,
            classroomAndLibraryTiles2,
            halloweenTiles,
            livingRoomSinglesTiles,
            bedroomSinglesTiles,
        ];

       
        // Create layers from the tilemap - must be in the same order as in Tiled
        map.createLayer("Floor", allTiles, 0,0);
        const wallsLayer = map.createLayer("Wall", allTiles, 0,0);
        wallsLayer?.setCollisionByExclusion([-1]);
        const wallPiecesLayer = map.createLayer("Wall Pieces", allTiles, 0,0);
        // wallPiecesLayer?.setCollisionByExclusion([-1]);
        map.createLayer("floor pieces", allTiles, 0,0);
        const floorPieces2Layer = map.createLayer("floor pieces 2", allTiles, 0,0);
        floorPieces2Layer?.setCollisionByExclusion([-1]);
        const floorPieces3Layer = map.createLayer("floor pieces 3", allTiles, 0,0);
        floorPieces3Layer?.setCollisionByExclusion([-1]);
        const floorPieces4Layer = map.createLayer("floor pieces 4", allTiles, 0,0);
        floorPieces4Layer?.setCollisionByExclusion([-1]);
        assert(wallsLayer && wallPiecesLayer && floorPieces2Layer && floorPieces3Layer && floorPieces4Layer, "All layers must be created correctly");

        // Spawn points for the player when exiting rooms
        const startingPoint = map.getObjectLayer("Player")?.objects[0];
        assert(startingPoint?.x && startingPoint?.y, "Player starting point must be defined in the map");
        const room1EntryPoint = map.getObjectLayer("Player")?.objects[1];
        assert(room1EntryPoint, "Room 1 entry point must be defined in the map");
        const room2EntryPoint = map.getObjectLayer("Player")?.objects[2];
        assert(room2EntryPoint, "Room 2 entry point must be defined in the map");

        // Create invisible static images for exit points
        const exitRoom1Object = map.getObjectLayer("Door")?.objects[1];
        assert(exitRoom1Object, "Exit point for room 1 must be defined in the map");
        const exitRoom1 = this.physics.add
            .staticImage(exitRoom1Object.x!, exitRoom1Object.y!, "")
            .setOrigin(0)
            .setSize(exitRoom1Object.width!, exitRoom1Object.height!)
            .setVisible(false);

        const exitRoom2Object = map.getObjectLayer("Door")?.objects[0];
        assert(exitRoom2Object, "Exit point for room 2 must be defined in the map");
        const exitRoom2 = this.physics.add
            .staticImage(exitRoom2Object.x!, exitRoom2Object.y!, "")
            .setOrigin(exitRoom2Object.x!, exitRoom2Object.y!)
            .setSize(exitRoom2Object.width!, exitRoom2Object.height!)
            .setVisible(false);

        // instantiate game objects
        const gameObjects = map.getObjectLayer("GameObjects")?.objects || [];
        this.interactionPrompt = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 250, 
            gameObjects[1].name, 
            {
                fontSize: '24px',
                backgroundColor: '#000000aa',
                padding: { x: 12, y: 8 },
            }
        ).setOrigin(0.5).setVisible(false).setScrollFactor(0);


        const projectsObj = this.physics.add
            .sprite(gameObjects[1].x!, gameObjects[1].y!, "")
            .setSize(gameObjects[1].width!, gameObjects[1].height!)
            .setScale(2)
            .setVisible(false)

        const expObj = this.physics.add
            .sprite(gameObjects[2].x!, gameObjects[2].y!, "")
            .setSize(gameObjects[2].width!, gameObjects[2].height!)
            .setScale(2)
            .setVisible(false)

        const contactObj = this.physics.add
            .sprite(gameObjects[3].x!, gameObjects[3].y!, "")
            .setSize(gameObjects[3].width!, gameObjects[3].height!)
            .setScale(2)
            .setVisible(false)

        const glow = this.add.graphics();
        glow.lineStyle(4, 0xd8404a, 0.8);

        for (const obj of [projectsObj, expObj, contactObj]) {
            glow.strokeRoundedRect(
            obj.x!,
            obj.y!,
            obj.displayWidth + 20,
            obj.displayHeight + 20,
            8
        );
        }


        // Animate the glow
        this.tweens.add({
            targets: glow,
            alpha: { from: 0.3, to: 1 },
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        

        // Starting point of player
        this.player = new MainPlayer(this, startingPoint.x, startingPoint.y, "down");
        this.cameras.main.startFollow(this.player);
        this.cursors = this.input.keyboard?.createCursorKeys() || null;
        this.eKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.E) || null;



        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(this.player, wallPiecesLayer);
        this.physics.add.collider(this.player, floorPieces2Layer);
        this.physics.add.collider(this.player, floorPieces3Layer);
        this.physics.add.collider(this.player, floorPieces4Layer);

        this.physics.add.overlap(this.player, exitRoom1, this.exitRoom1, undefined, this);
        this.physics.add.overlap(this.player, exitRoom2, this.exitRoom2, undefined, this);
        this.physics.add.overlap(this.player, projectsObj, this.handleNavigationText.bind(this, "Projects"), undefined, this);
        this.physics.add.overlap(this.player, contactObj, this.handleNavigationText.bind(this, "Contact"), undefined, this);
        this.physics.add.overlap(this.player, expObj, this.handleNavigationText.bind(this, "Experience"), undefined, this);
        

        
    }
    
    update() {
        if (this.player && this.cursors) {
            this.player.move2D(this.cursors);
        }

        // Check for interaction exit (when player moves away from objects)
        this.checkInteractionExit();

        // Handle E key press for navigation
        if (this.eKey?.isDown && this.currentInteraction) {
            EventBus.emit("navigation-text", this.currentInteraction);
            this.interactionPrompt?.setVisible(false);
            this.currentInteraction = null;
        }
    }

    exitRoom1() {
        this.player?.play("run-down", true);
    }

    exitRoom2() {
    }

    handleNavigationText = (pageName: string) => {
        if (this.interactionPrompt) {
                this.interactionPrompt
                    .setText(`Press E to navigate to my ${pageName} page`)
                    .setVisible(true);
            }
        this.currentInteraction = {
            name: pageName,
            route: `/${pageName.toLowerCase()}`
        };

    }

    checkInteractionExit = () => {
        if (!this.currentInteraction || !this.player) return;

        // Get all interaction objects
        const gameObjects = this.physics.world.bodies.entries;
        let isOverlapping = false;

        // Check if player is still overlapping with any interaction object
        for (const body of gameObjects) {
            if (body.gameObject && body.gameObject !== this.player && 
                this.physics.overlap(this.player, body.gameObject)) {
                isOverlapping = true;
                break;
            }
        }

        // If no longer overlapping, clear the interaction
        if (!isOverlapping) {
            this.currentInteraction = null;
            if (this.interactionPrompt) {
                this.interactionPrompt.setVisible(false);
            }
        }
    }

}

export default SamiBedroom;