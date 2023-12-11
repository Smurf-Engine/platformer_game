import { BoxCollider, GameObject, SpriteRenderer, SpriteSheetAnimator, Vector2 } from "smurf-engine";
import AssetManager from "../../../assets/asset_manager";
import { engine } from "../../../setup";
import { MovingPlatform } from "./components/moving_platform";
import { EnvironmentSwitcher, GrassType } from "./components/environment_switcher";

export type Type<T> = { new(...args: any[]): T; };

export function grassBlockBuilder(position: Vector2, columnCount: number, extendYTillBottom = false, movingPlatformEndPosition?: Vector2) {
    let blocks = [];
    for (let i = 0; i < columnCount; i++) {
        let newBlock = new GameObject({
            name: "Grass",
            engine,
        });

        newBlock.transform.position = new Vector2(position.x + (i * 100), position.y);
        newBlock.transform.size = new Vector2(100, 100);
        newBlock.transform.zIndex = 10;

        let spriteSheetRenderer = newBlock.addComponent(SpriteRenderer);
        let sprite = AssetManager.getSprites.environment.spring.grass;
        let grassType = GrassType.Normal;
        if (columnCount !== 1) {
            if (i == 0) {
                sprite = AssetManager.getSprites.environment.spring.grassLeft;
                grassType = GrassType.Left;
            } else if (i == columnCount - 1) {
                sprite = AssetManager.getSprites.environment.spring.grassRight;
                grassType = GrassType.Right;
            }
            else {
                sprite = AssetManager.getSprites.environment.spring.grassMid;
                grassType = GrassType.Mid;
            }
        }
        spriteSheetRenderer.constructSpriteFromSource(sprite);

        let collider = newBlock.addComponent(BoxCollider);
        collider.drawBounds = true;
        newBlock.addComponent(EnvironmentSwitcher).grassType = grassType;
        if (movingPlatformEndPosition) {
            let x = movingPlatformEndPosition.x;
                x += (columnCount) * 100;
            newBlock.addComponent(MovingPlatform).setEndPosition(new Vector2(x, movingPlatformEndPosition.y));
        }
        blocks.push(newBlock);
    }

    if (extendYTillBottom) {
        for (let row = 1; row < 10; row++) {
            for (let i = 0; i < columnCount; i++) {
                let dirtBlock = new GameObject({
                    name: "Dirt",
                    engine,
                });

                dirtBlock.transform.zIndex = 10;

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

export function waterBuilder(position: Vector2, size: Vector2) {
    const water = new GameObject({
        name: "Water",
        engine
    });
    water.transform.zIndex = 10;

    water.transform.size = size;
    water.transform.position = position;

    water.addComponent<SpriteRenderer>(SpriteRenderer).constructSpriteFromSource(AssetManager.getSheets.water[0]);
    let animator = water.addComponent(SpriteSheetAnimator);
    animator.sprites = AssetManager.getSheets.water;
    animator.pauseDurationInSeconds = 0;
    return water;
}

let bottomCorner = engine.canvas.height - 100;

let environment: GameObject[] = [
    ...grassBlockBuilder(new Vector2(0, bottomCorner - 300), 5, true),
    ...grassBlockBuilder(new Vector2(500, bottomCorner - 100), 8, true),
    ...grassBlockBuilder(new Vector2(1300, bottomCorner), 3),
    ...grassBlockBuilder(new Vector2(1800, bottomCorner - 200), 2),
    ...grassBlockBuilder(new Vector2(2100, bottomCorner - 300), 4, true),
    waterBuilder(new Vector2(2500, bottomCorner - 100), new Vector2(400, 200)),
    ...grassBlockBuilder(new Vector2(2700, bottomCorner - 220), 1, false, new Vector2(3300, bottomCorner - 220)),
    waterBuilder(new Vector2(2900, bottomCorner - 100), new Vector2(400, 200)),
    waterBuilder(new Vector2(3300, bottomCorner - 100), new Vector2(400, 200)),
    ...grassBlockBuilder(new Vector2(3700, bottomCorner - 300), 4, true),
];

export default environment;