import { GameObject, SpriteRenderer, Vector2 } from "smurf-engine";
import { engine } from "../../../setup";
import AssetManager from "../../../assets/asset_manager";

const backgroundBuilder = (idx = 0) => {
    const background = new GameObject({
        name: "Background",
        engine,
    });
    background.isStatic = true;

    background.transform.position = new Vector2(0 + (engine.canvas.width * idx), -100);
    background.transform.size = new Vector2(engine.canvas.width, engine.canvas.height + 101);

    let spriteSheetRenderer = background.addComponent(SpriteRenderer);
    spriteSheetRenderer.constructSpriteFromSource(AssetManager.getSprites.background);
    return background;
}

export default backgroundBuilder;