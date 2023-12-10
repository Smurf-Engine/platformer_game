import { Component, Physics2D } from "smurf-engine";

export default class PlayerMovement extends Component{
    physics! : Physics2D;
    
    start(){
        this.physics = this.gameObject.getComponent(Physics2D)!;
    }

    update(): void {
        // vertical movement
        if(this.engine.input.isPressed("ArrowUp") || this.engine.input.isPressed("Space")){
            this.physics.velocity.y = -5;
        }
        // horizontal movement
        if(this.engine.input.isPressed("ArrowLeft") || this.engine.input.isPressed("KeyA")){
            this.physics.velocity.x = -5;
        }else if(this.engine.input.isPressed("ArrowRight") || this.engine.input.isPressed("KeyD")){
            this.physics.velocity.x = 5;
        }else{
            this.physics.velocity.x = 0;
        }
    }
}