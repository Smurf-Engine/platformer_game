import { Scene } from "smurf-engine";
import { engine } from "../setup";
import AssetManager from "../assets/asset_manager";
import { Player } from "./game_scene/game_objects/player";
import ground from "./game_scene/game_objects/grass_block";
import game_ui from "./game_scene/ui";
import backgroundBuilder from "./game_scene/game_objects/background";

engine.assetPipeline.addToLoad(...AssetManager.getSheets.player.idle, ...AssetManager.getSheets.player.idle_left, AssetManager.getSprites.background, AssetManager.getSprites.environment.spring.grass);

const GAME_SCENE = new Scene();

GAME_SCENE.addGameObject(backgroundBuilder(0));
GAME_SCENE.addGameObject(backgroundBuilder(1));
GAME_SCENE.addGameObject(backgroundBuilder(2));
GAME_SCENE.addGameObject(backgroundBuilder(3));
GAME_SCENE.addGameObject(backgroundBuilder(4));
GAME_SCENE.addGameObject(Player);
GAME_SCENE.addGameObject(game_ui);
ground.forEach((grass) => { GAME_SCENE.addGameObject(grass) });

export default GAME_SCENE;