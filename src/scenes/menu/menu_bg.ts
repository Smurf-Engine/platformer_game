import { GameObject, SpriteRenderer, Vector2 } from "smurf-engine";
import { engine } from "../../setup";
import AssetManager from "../../assets/asset_manager";

const menu_background = new GameObject({
    name: "menu_background_top",
    engine,
});

menu_background.transform.size = new Vector2(engine.canvas.width + 400, engine.canvas.height);
menu_background.transform.position = new Vector2(0, 0);

let sp = menu_background.addComponent(SpriteRenderer);
sp.constructSpriteFromSource(AssetManager.getSprites.background);

export default menu_background;