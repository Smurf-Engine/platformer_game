import { Component, GameObject, Physics2D, Vector2 } from "smurf-engine";

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

    start(): void {
        this.physics = this.gameObject.getComponent(Physics2D)!;
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
            this.cx.translate(-this.physics.velocity.x, 0);
            this.rightFlag += Math.abs(this.physics.velocity.x);
            this.backgrounds.forEach((background) => {
                background.transform.position.x += Math.abs(this.physics.velocity.x * .35);
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
}