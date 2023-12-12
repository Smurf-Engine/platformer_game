import { Scene } from "smurf-engine";
import { engine } from "../setup";
import AssetManager from "../assets/asset_manager";
import { Player } from "./game_scene/game_objects/player";
import environment from "./game_scene/game_objects/environment";
import game_ui from "./game_scene/ui";
import backgroundBuilder from "./game_scene/game_objects/background";
import DETAILS from "./game_scene/game_objects/detail_builder";

engine.assetPipeline.addToLoad(AssetManager.getSprites.jumpSound,...AssetManager.getSheets.player.idle, ...AssetManager.getSheets.player.idle_left, AssetManager.getSprites.background, AssetManager.getSprites.environment.spring.grass, AssetManager.getSprites.environment.spring.grassLeft, AssetManager.getSprites.environment.spring.grassMid, AssetManager.getSprites.environment.spring.grassRight, AssetManager.getSprites.environment.dirt.dirtLeft, AssetManager.getSprites.environment.dirt.dirtMid, AssetManager.getSprites.environment.dirt.dirtRight, ...AssetManager.getSheets.water, ...AssetManager.getSheets.coin, AssetManager.getSprites.environment.autumn.grass, AssetManager.getSprites.environment.autumn.grassLeft, AssetManager.getSprites.environment.autumn.grassMid, AssetManager.getSprites.environment.autumn.grassRight, AssetManager.getSprites.environment.winter.grass, AssetManager.getSprites.environment.winter.grassLeft, AssetManager.getSprites.environment.winter.grassMid, AssetManager.getSprites.environment.winter.grassRight, AssetManager.getSprites.environment.details.tree, AssetManager.getSprites.environment.details.tree_2, AssetManager.getSprites.environment.details.flower);

const GAME_SCENE = new Scene();

for (let i = 0; i < 5; i++) {
    GAME_SCENE.addGameObject(backgroundBuilder(i));
}
GAME_SCENE.addGameObject(Player);
GAME_SCENE.addGameObject(game_ui);
environment.forEach((envObject) => { GAME_SCENE.addGameObject(envObject); });
DETAILS.forEach((detail) => { GAME_SCENE.addGameObject(detail); });

export default GAME_SCENE;