import { GameObject, SpriteRenderer, Vector2 } from "smurf-engine";
import { engine } from "../../../setup";
import AssetManager from "../../../assets/asset_manager";

export function detailBuilder(position : Vector2){
    const detail = new GameObject({
        name: "Detail",
        engine,
    });
    detail.isStatic = true;

    position.subtract(new Vector2(0, 45));
    detail.transform.position = position;
    detail.transform.zIndex = 9;
    detail.transform.size = new Vector2(50, 50);
    
    let sprites = [
        AssetManager.getSprites.environment.details.tree,
        AssetManager.getSprites.environment.details.tree_2,
        AssetManager.getSprites.environment.details.flower,
    ];
    let idx = Math.floor(Math.random() * sprites.length);
    let randomSprite = sprites[idx];
    if (idx < 2){
        detail.transform.size = new Vector2(100, 200);
        position.subtract(new Vector2(0, 150));
        detail.transform.position = position;
    }
    detail.addComponent(SpriteRenderer).constructSpriteFromSource(randomSprite);
    return detail;
}

function generateRandomPositionBetween(min : number, max : number){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
let bottomCorner = engine.canvas.height - 100;
const DETAILS : GameObject[] = [
    detailBuilder(new Vector2(generateRandomPositionBetween(50, 400), bottomCorner - 300)),
    detailBuilder(new Vector2(generateRandomPositionBetween(500, 800), bottomCorner - 100)),
    detailBuilder(new Vector2(generateRandomPositionBetween(850, 1200), bottomCorner - 100)),
    detailBuilder(new Vector2(generateRandomPositionBetween(1800, 1900), bottomCorner - 200)),
    detailBuilder(new Vector2(generateRandomPositionBetween(4100, 4600), bottomCorner - 300)),
    detailBuilder(new Vector2(generateRandomPositionBetween(4700, 5100), bottomCorner - 100)),
];
export default DETAILS;