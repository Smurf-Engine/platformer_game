import { Component, GameObject, Physics2D, SoundSystem, SpriteRenderer, SpriteSheetAnimator } from "smurf-engine";
import AssetManager from "../../../../assets/asset_manager";

export default class PlayerMovement extends Component{
    physics! : Physics2D;
    spriteRenderer! : SpriteRenderer;
    spriteSheetAnimator! : SpriteSheetAnimator;
    sound! : SoundSystem;
    isLookingLeft = false;
    isMidAir = false;
    
    start(){
        this.physics = this.gameObject.getComponent(Physics2D)!;
        this.spriteRenderer = this.gameObject.getComponent(SpriteRenderer)!;
        this.spriteSheetAnimator = this.gameObject.getComponent(SpriteSheetAnimator)!;
        this.sound = this.gameObject.getComponent(SoundSystem)!;
    }

    update(): void {
        // vertical movement
        if((this.engine.input.isPressed("ArrowUp") || this.engine.input.isPressed("Space")) && !this.isMidAir){
            this.physics.velocity.y = -7;
            // this.sound.play();
            this.isMidAir = true;
        }
        // horizontal movement
        if(this.engine.input.isPressed("ArrowLeft") || this.engine.input.isPressed("KeyA")){
            this.physics.velocity.x = -7;
            this.isLookingLeft = true;
        }else if(this.engine.input.isPressed("ArrowRight") || this.engine.input.isPressed("KeyD")){
            this.physics.velocity.x = 7;
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

    onCollisionEnter(other: GameObject): void {
        if(other.name === "Grass"){
            this.isMidAir = false;
        }
    }
}