import { GameObject, SpriteRenderer, SpriteSheetAnimator, Vector2 } from "smurf-engine";
import { engine } from "../../../setup";
import AssetManager from "../../../assets/asset_manager";

export const Player = new GameObject({
    name: 'Player',
    engine,
});

Player.transform.position = new Vector2(100, 100);
Player.transform.size = new Vector2(100, 100);

Player.addComponent(SpriteRenderer).constructSpriteFromSource(AssetManager.getSheets().player.idle[0]);
let animator = Player.addComponent(SpriteSheetAnimator);
animator.sprites = AssetManager.getSheets().player.idle;
animator.pauseDurationInSeconds = 2;
animator.framesPerSecond = 5;