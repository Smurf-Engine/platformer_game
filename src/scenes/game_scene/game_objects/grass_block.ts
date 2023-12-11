import { BoxCollider, GameObject, SpriteRenderer, Vector2 } from "smurf-engine";
import AssetManager from "../../../assets/asset_manager";
import { engine } from "../../../setup";

export function grassBlockBuilder(position: Vector2, columnCount: number, extendYTillBottom = false) {
    let blocks = [];
    for (let i = 0; i < columnCount; i++) {
        let newBlock = new GameObject({
            name: "Grass",
            engine,
        });

        newBlock.transform.position = new Vector2(position.x + (i * 100), position.y);
        newBlock.transform.size = new Vector2(100, 100);

        let spriteSheetRenderer = newBlock.addComponent(SpriteRenderer);
        let sprite = AssetManager.getSprites.environment.spring.grass;
        if (columnCount !== 1) {
            if (i == 0) {
                sprite = AssetManager.getSprites.environment.spring.grassLeft;
            } else if (i == columnCount - 1) {
                sprite = AssetManager.getSprites.environment.spring.grassRight;
            }
            else {
                sprite = AssetManager.getSprites.environment.spring.grassMid;
            }
        }
        spriteSheetRenderer.constructSpriteFromSource(sprite);

        newBlock.addComponent(BoxCollider);
        blocks.push(newBlock);

        
    }

    if (extendYTillBottom) {
        for (let row = 1; row < 10; row++) {
            for (let i = 0; i < columnCount; i++) {
                let dirtBlock = new GameObject({
                    name: "Dirt",
                    engine,
                });
    
                dirtBlock.transform.position = new Vector2(position.x + (i * 100), position.y + (100 * row));
                dirtBlock.transform.size = new Vector2(100, 100);
    
                let spriteSheetRenderer = dirtBlock.addComponent(SpriteRenderer);
                let sprite = AssetManager.getSprites.environment.dirt.dirtMid;
                if (columnCount !== 1) {
                    if (i == 0) {
                        sprite = AssetManager.getSprites.environment.dirt.dirtLeft;
                    } else if (i == columnCount - 1) {
                        sprite = AssetManager.getSprites.environment.dirt.dirtRight;
                    }
                    else {
                        sprite = AssetManager.getSprites.environment.dirt.dirtMid;
                    }
                }
                spriteSheetRenderer.constructSpriteFromSource(sprite);
    
                dirtBlock.addComponent(BoxCollider);
                blocks.push(dirtBlock);
            }
        }
    }


    return blocks;
}

let bottomCorner = engine.canvas.height - 100;

let ground: GameObject[] = [
    ...grassBlockBuilder(new Vector2(0, bottomCorner - 300), 5, true),
    ...grassBlockBuilder(new Vector2(500, bottomCorner - 100), 8, true),
    ...grassBlockBuilder(new Vector2(1300, bottomCorner), 3),
];

export default ground;