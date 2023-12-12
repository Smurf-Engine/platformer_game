import { Component, GameObject, SpriteSheetAnimator } from "smurf-engine";

export class ChestManager extends Component{
    animator! : SpriteSheetAnimator;
    start(){
        this.animator = this.gameObject.getComponent(SpriteSheetAnimator)!;
        this.animator.isPlaying = false;
        this.animator.loop = false;
    }

    onCollisionEnter(other: GameObject): void {
        if(other.name === "Player"){
            console.log("Player touched chest");
            this.animator.play();
        }
    }
}