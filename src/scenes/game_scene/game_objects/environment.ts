import { BoxCollider, GameObject, SpriteRenderer, SpriteSheetAnimator, Vector2 } from "smurf-engine";
import AssetManager from "../../../assets/asset_manager";
import { engine } from "../../../setup";
import { MovingPlatform } from "./components/moving_platform";
import { EnvironmentSwitcher, GrassType } from "./components/environment_switcher";
import { ChestManager } from "./components/chest_manager";

export type Type<T> = { new(...args: any[]): T; };

export function grassBlockBuilder(position: Vector2, columnCount: number, extendYTillBottom = false, movingPlatformEndPosition?: Vector2) {
    let blocks = [];
    for (let i = 0; i < columnCount; i++) {
        let newBlock = new GameObject({
            name: "Grass",
            engine,
        });
        if(!movingPlatformEndPosition){
            newBlock.isStatic = true;
        }

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

        newBlock.addComponent(BoxCollider);
        newBlock.addComponent(EnvironmentSwitcher).grassType = grassType;
        if (movingPlatformEndPosition) {
            let x = movingPlatformEndPosition.x;
            x += (columnCount) * 100;
            newBlock.addComponent(MovingPlatform).setEndPosition(new Vector2(x, movingPlatformEndPosition.y));
        }
        blocks.push(newBlock);
    }

    if (extendYTillBottom) {
        let maxRowsTillBottom = Math.floor((engine.canvas.height - position.y) / 100);
        for (let row = 1; row <= maxRowsTillBottom; row++) {
            for (let i = 0; i < columnCount; i++) {
                let dirtBlock = new GameObject({
                    name: "Dirt",
                    engine,
                });
                dirtBlock.isStatic = true;

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
    water.isStatic = false;
    water.transform.zIndex = 10;

    water.transform.size = size;
    water.transform.position = position;

    water.addComponent<SpriteRenderer>(SpriteRenderer).constructSpriteFromSource(AssetManager.getSheets.water[0]);
    let animator = water.addComponent(SpriteSheetAnimator);
    animator.sprites = AssetManager.getSheets.water;
    animator.pauseDurationInSeconds = 0;
    return water;
}

export function coinBuilder(position: Vector2) {
    const coin = new GameObject({
        name: "Coin",
        engine
    });
    coin.isStatic = true;
    coin.transform.zIndex = 10;

    coin.transform.size = new Vector2(25, 25);
    coin.transform.position = position;

    let spr = coin.addComponent<SpriteRenderer>(SpriteRenderer);
    spr.constructSpriteFromSource(AssetManager.getSheets.coin[0]);
    spr.useNaturalSize = true;
    spr.scale = new Vector2(.1, .1);
    let animator = coin.addComponent(SpriteSheetAnimator);
    animator.sprites = AssetManager.getSheets.coin;
    animator.framesPerSecond = 5;
    return coin;
}

export function chestBuilder(position: Vector2) {
    const chest = new GameObject({
        name: "Chest",
        engine
    });
    chest.isStatic = true;
    chest.transform.zIndex = 10;

    chest.transform.size = new Vector2(100, 100);
    position.subtract(new Vector2(0, 5));
    chest.transform.position = position;

    let spr = chest.addComponent<SpriteRenderer>(SpriteRenderer);
    spr.constructSpriteFromSource(AssetManager.getSheets.chest[0]);
    let animator = chest.addComponent(SpriteSheetAnimator);
    animator.sprites = AssetManager.getSheets.chest;
    animator.framesPerSecond = 13;
    chest.addComponent(BoxCollider);
    chest.addComponent(ChestManager);
    return chest;
}

let bottomCorner = engine.canvas.height - 100;

let environment: GameObject[] = [
    ...grassBlockBuilder(new Vector2(0, bottomCorner - 300), 5, true),
    ...grassBlockBuilder(new Vector2(500, bottomCorner - 100), 8, true),
    ...grassBlockBuilder(new Vector2(1300, bottomCorner), 3),
    coinBuilder(new Vector2(1350, bottomCorner - 75)),
    coinBuilder(new Vector2(1450, bottomCorner - 75)),
    coinBuilder(new Vector2(1550, bottomCorner - 75)),
    ...grassBlockBuilder(new Vector2(1700, bottomCorner - 100), 1),
    ...grassBlockBuilder(new Vector2(1800, bottomCorner - 200), 2),
    ...grassBlockBuilder(new Vector2(2100, bottomCorner - 300), 4, true),
    waterBuilder(new Vector2(2500, bottomCorner - 100), new Vector2(1600, 200)),
    ...grassBlockBuilder(new Vector2(2700, bottomCorner - 220), 1, false, new Vector2(3700, bottomCorner - 220)),
    ...grassBlockBuilder(new Vector2(4100, bottomCorner - 300), 6, true),
    ...grassBlockBuilder(new Vector2(4700, bottomCorner - 100), 5, true),
    ...grassBlockBuilder(new Vector2(5200, bottomCorner), 10, true),
    chestBuilder(new Vector2(6000, bottomCorner - 100)),
    ...grassBlockBuilder(new Vector2(6200, 200), 10, true),
];

export default environment;