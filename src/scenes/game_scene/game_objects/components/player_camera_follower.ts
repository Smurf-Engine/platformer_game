import { Component, GameObject, Physics2D, Vector2 } from "smurf-engine";
import { MovingPlatform } from "./moving_platform";

export class PlayerCameraFollower extends Component {
    box = {
        position: new Vector2(0, 0),
        width: window.innerWidth * .8,
        height: 400,
    };
    backgrounds: GameObject[] = [];
    showBoxBounds = false;
    rightFlag = 0;
    physics!: Physics2D;
    movingPlatform?: MovingPlatform;

    start(): void {
        this.physics = this.gameObject.getComponent(Physics2D)!;
        this.physics.gravity = .2;
        this.rightFlag = this.engine.canvas.width;
    }

    onFirstUpdate(): void {
        this.backgrounds = this.engine.scene!.getGameObjectsByName("Background");
    }

    update(): void {
        this.relocateBox();

        if (this.showBoxBounds) {
            this.cx.fillStyle = "rgba(255, 0, 0, 0.5)";
            this.cx.fillRect(this.box.position.x, this.box.position.y, this.box.width, this.box.height);
        }

        if (this.shouldPanCameraLeft()) {
            let translateX = Number(this.physics.velocity.x);
            if (this.movingPlatform !== undefined) {
                translateX = this.movingPlatform.speed;
            }
            this.cx.translate(-translateX, 0);
            this.rightFlag += Math.abs(translateX);
            this.backgrounds.forEach((background) => {
                background.transform.position.x += Math.abs(translateX * .35);
            });
        }
    }

    relocateBox() {
        this.box.position.x = this.gameObject.transform.position.x - this.box.width / 2;
        this.box.position.y = this.gameObject.transform.position.y - this.box.height / 2;
    }

    shouldPanCameraLeft(): boolean {
        const rightSide = this.box.position.x + this.box.width;
        return rightSide > this.rightFlag;
    }

    onCollisionEnter(other: GameObject): void {
        other.hasComponent(MovingPlatform) && (this.movingPlatform = other.getComponent(MovingPlatform));
    }

    onCollisionExit(other?: GameObject | undefined): void {
        other?.hasComponent(MovingPlatform) && (this.movingPlatform = undefined);
    }
}