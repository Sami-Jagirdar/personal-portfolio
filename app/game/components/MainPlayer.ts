import { Physics } from "phaser";

const CHAR_FRAMES_PER_ROW = 9;
const PLAYER = {
    TEXTURE: "sami",
    speed: 200,
    SCALE: 2,
};

export class MainPlayer extends Physics.Arcade.Sprite {
    currentDirection: string;
    constructor(scene: Phaser.Scene, x: number, y: number, direction = "down") {
        super(scene, x, y, PLAYER.TEXTURE);
        this.currentDirection = direction || "down";
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setScale(PLAYER.SCALE);
        this.setCollideWorldBounds(true);
        this.setSize(28, 16); // Smaller collision box
        this.setOffset(16, 32); 
    } 

    move2D(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        const speed = PLAYER.speed;
        if (cursors.left.isDown) {
            this.setVelocityX(-speed);
            this.currentDirection = "left";
            this.anims.play("run-left", true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(speed);
            this.currentDirection = "right";
            this.anims.play("run-right", true);
        } else if (cursors.up.isDown) {
            this.setVelocityY(-speed);
            this.currentDirection = "up";
            this.anims.play("run-up", true);
        } else if (cursors.down.isDown) {
            this.setVelocityY(speed);
            this.currentDirection = "down";
            this.anims.play("run-down", true);
        } else {

            // unnecessary I think, but just in case
            this.setVelocityY(0);
            this.setVelocityX(0);

            // stop the animation and set texture based on direction
            this.anims.stop();
            this.setTexture(
                PLAYER.TEXTURE,
                this.currentDirection === "up"
                    ? 0
                    : this.currentDirection === "left"
                        ? CHAR_FRAMES_PER_ROW
                        : this.currentDirection === "down"
                            ? 2 * CHAR_FRAMES_PER_ROW
                            : 3 * CHAR_FRAMES_PER_ROW
            );
        }

    }

        
}