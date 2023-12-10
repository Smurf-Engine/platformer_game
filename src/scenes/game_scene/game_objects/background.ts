import { GameObject, SpriteRenderer, Vector2 } from "smurf-engine";
import { engine } from "../../../setup";
import AssetManager from "../../../assets/asset_manager";

const background = new GameObject({
    name: "Background",
    engine,
});

background.transform.position = new Vector2(0, 0);
background.transform.size = new Vector2(engine.canvas.width, engine.canvas.height);

let spriteSheetRenderer = background.addComponent(SpriteRenderer);
spriteSheetRenderer.constructSpriteFromSource(AssetManager.getSprites.background);

console.log(background);

export default background;