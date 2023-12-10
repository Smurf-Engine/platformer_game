import { Scene } from "smurf-engine";
import { engine } from "../setup";
import AssetManager from "../assets/asset_manager";
import { Player } from "./game_scene/game_objects/player";
import background from "./game_scene/game_objects/background";
import ground from "./game_scene/game_objects/grass_block";
import game_ui from "./game_scene/ui";

engine.assetPipeline.addToLoad(...AssetManager.getSheets.player.idle, ...AssetManager.getSheets.player.idle_left, AssetManager.getSprites.background, AssetManager.getSprites.environment.spring.grass);

const GAME_SCENE = new Scene();

GAME_SCENE.addGameObject(background);
GAME_SCENE.addGameObject(Player);
GAME_SCENE.addGameObject(game_ui);
ground.forEach((grass) => { GAME_SCENE.addGameObject(grass) });

export default GAME_SCENE;