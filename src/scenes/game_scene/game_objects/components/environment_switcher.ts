import { Component, SpriteRenderer } from "smurf-engine";
import AssetManager from "../../../../assets/asset_manager";

export enum EnvironmentTheme{
    Autumn,
    Spring,
    Winter
}

export enum GrassType{
    Normal,
    Left,
    Mid,
    Right
}

export class EnvironmentSwitcher extends Component{
    theme = EnvironmentTheme.Spring;
    spriteRenderer! : SpriteRenderer;
    grassType = GrassType.Normal;

    start(): void {
        this.spriteRenderer = this.gameObject.getComponent(SpriteRenderer)!;
    }

    update(): void {
        if (this.input.isPressed("KeyT")) {
            if (this.theme === EnvironmentTheme.Autumn) {
                this.theme = EnvironmentTheme.Spring;
            }else if(this.theme === EnvironmentTheme.Spring){
                this.theme = EnvironmentTheme.Winter;
            } else {
                this.theme = EnvironmentTheme.Autumn;
            }
            this.switchTheme();
        }
    }

    switchTheme(){
        let key : "autumn" | "spring" | "winter" = "autumn";
        console.log("current theme: " + this.theme + " key: " + key + "");
        if (this.theme == EnvironmentTheme.Autumn) {
            key = "autumn";
        }else if(this.theme == EnvironmentTheme.Spring){
            key = "spring";
        }else {
            key = "winter";
        }
        let sprite = AssetManager.getSprites.environment[key].grass;
        if (this.grassType == GrassType.Normal) {
            sprite = AssetManager.getSprites.environment[key].grass;
        }else if(this.grassType == GrassType.Left){
            sprite = AssetManager.getSprites.environment[key].grassLeft;
        } else if (this.grassType == GrassType.Mid) {
            sprite = AssetManager.getSprites.environment[key].grassMid;
        } else if (this.grassType == GrassType.Right) {
            sprite = AssetManager.getSprites.environment[key].grassRight;
        }
        console.log("switched theme: " + this.theme + " key: " + key + "");
        this.spriteRenderer.constructSpriteFromSource(sprite);
    }
}