import { Scene } from "smurf-engine";
import { engine } from "../setup";
import AssetManager from "../assets/asset_manager";
import { Player } from "./game_scene/game_objects/player";
import environment from "./game_scene/game_objects/environment";
import game_ui from "./game_scene/ui";
import backgroundBuilder from "./game_scene/game_objects/background";

engine.assetPipeline.addToLoad(...AssetManager.getSheets.player.idle, ...AssetManager.getSheets.player.idle_left, AssetManager.getSprites.background, AssetManager.getSprites.environment.spring.grass, AssetManager.getSprites.environment.spring.grassLeft, AssetManager.getSprites.environment.spring.grassMid, AssetManager.getSprites.environment.spring.grassRight, AssetManager.getSprites.environment.dirt.dirtLeft, AssetManager.getSprites.environment.dirt.dirtMid, AssetManager.getSprites.environment.dirt.dirtRight, ...AssetManager.getSheets.water, ...AssetManager.getSheets.coin, AssetManager.getSprites.environment.autumn.grass, AssetManager.getSprites.environment.autumn.grassLeft, AssetManager.getSprites.environment.autumn.grassMid, AssetManager.getSprites.environment.autumn.grassRight, AssetManager.getSprites.environment.winter.grass, AssetManager.getSprites.environment.winter.grassLeft, AssetManager.getSprites.environment.winter.grassMid, AssetManager.getSprites.environment.winter.grassRight);

const GAME_SCENE = new Scene();

for (let i = 0; i < 5; i++) {
    GAME_SCENE.addGameObject(backgroundBuilder(i));
}
GAME_SCENE.addGameObject(Player);
GAME_SCENE.addGameObject(game_ui);
environment.forEach((envObject) => { GAME_SCENE.addGameObject(envObject); });

export default GAME_SCENE;