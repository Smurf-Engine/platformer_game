import { BoxCollider, GameObject, SpriteRenderer, Vector2 } from "smurf-engine";
import AssetManager from "../../../assets/asset_manager";
import { engine } from "../../../setup";

function grassBuilder(x  : number, y : number) : GameObject {
    let grass = new GameObject({
        name: "Grass",
        engine,
    });

    grass.transform.position = new Vector2(x, y);
    grass.transform.size = new Vector2(100, 100);

    let spriteSheetRenderer = grass.addComponent(SpriteRenderer);
    spriteSheetRenderer.constructSpriteFromSource(AssetManager.getSprites.environment.spring.grass);

    grass.addComponent(BoxCollider).drawBounds = true;

    return grass;
}

let bottomCorner = engine.canvas.height - 100;

let ground : GameObject[] = [
    grassBuilder(100,bottomCorner),
    grassBuilder(200,bottomCorner),
    grassBuilder(400,bottomCorner - 200),
    grassBuilder(500,bottomCorner - 200),
    grassBuilder(600,bottomCorner - 200),
    grassBuilder(700,bottomCorner - 500),
];

export default ground;