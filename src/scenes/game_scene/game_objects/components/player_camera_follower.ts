import { Component, Physics2D, Vector2 } from "smurf-engine";

export class PlayerCameraFollower extends Component{
    box = {
        position : new Vector2(0, 0),
        width : 600,
        height : 400,
    };
    rightFlag = 0;
    physics!: Physics2D;

    start(): void {
        this.physics = this.gameObject.getComponent(Physics2D)!;
        this.rightFlag = this.engine.canvas.width;
    }

    update(): void {
        this.relocateBox();

        // this.cx.fillStyle = "rgba(255, 0, 0, 0.5)";
        // this.cx.fillRect(this.box.position.x, this.box.position.y, this.box.width, this.box.height);

        if(this.shouldPanCameraLeft()){
            this.cx.translate(-this.physics.velocity.x, 0);
            this.rightFlag += Math.abs(this.physics.velocity.x);
        }
    }

    relocateBox(){
        this.box.position.x = this.gameObject.transform.position.x - this.box.width / 2;
        this.box.position.y = this.gameObject.transform.position.y - this.box.height / 2;
    }

    shouldPanCameraLeft(): boolean {
        const rightSide = this.box.position.x + this.box.width;
        return rightSide > this.rightFlag;
    }
}