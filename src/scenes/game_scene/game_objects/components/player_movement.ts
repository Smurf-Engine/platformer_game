import { Component, Physics2D, SpriteRenderer, SpriteSheetAnimator } from "smurf-engine";
import AssetManager from "../../../../assets/asset_manager";

export default class PlayerMovement extends Component{
    physics! : Physics2D;
    spriteRenderer! : SpriteRenderer;
    spriteSheetAnimator! : SpriteSheetAnimator;
    isLookingLeft = false;
    
    start(){
        this.physics = this.gameObject.getComponent(Physics2D)!;
        this.spriteRenderer = this.gameObject.getComponent(SpriteRenderer)!;
        this.spriteSheetAnimator = this.gameObject.getComponent(SpriteSheetAnimator)!;
    }

    update(): void {
        // vertical movement
        if(this.engine.input.isPressed("ArrowUp") || this.engine.input.isPressed("Space")){
            this.physics.velocity.y = -5;
        }
        // horizontal movement
        if(this.engine.input.isPressed("ArrowLeft") || this.engine.input.isPressed("KeyA")){
            this.physics.velocity.x = -5;
            this.isLookingLeft = true;
        }else if(this.engine.input.isPressed("ArrowRight") || this.engine.input.isPressed("KeyD")){
            this.physics.velocity.x = 5;
            this.isLookingLeft = false;
        }else{
            this.physics.velocity.x = 0;
        }

        this.swapSpriteSheet();
    }

    swapSpriteSheet(){
        if (this.isLookingLeft && !this.spriteSheetAnimator.sprites[0].endsWith("_left.png")) {
            this.spriteRenderer.constructSpriteFromSource(AssetManager.getSheets.player.idle_left[0]);
            this.spriteSheetAnimator.sprites = AssetManager.getSheets.player.idle_left;
        }else if(!this.isLookingLeft && this.spriteSheetAnimator.sprites[0].endsWith("_left.png")){
            this.spriteRenderer.constructSpriteFromSource(AssetManager.getSheets.player.idle[0]);
            this.spriteSheetAnimator.sprites = AssetManager.getSheets.player.idle;
        }
    }
}