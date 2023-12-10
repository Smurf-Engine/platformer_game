import { Camera, GameObject, Scene } from "smurf-engine";
import { engine } from "../setup";
import AssetManager from "../assets/asset_manager";
import { Player } from "./game_scene/game_objects/player";
import background from "./game_scene/game_objects/background";
import ground from "./game_scene/game_objects/grass_block";

engine.assetPipeline.addToLoad(...AssetManager.getSheets.player.idle, ...AssetManager.getSheets.player.idle_left, AssetManager.getSprites.background, AssetManager.getSprites.environment.spring.grass);

const GAME_SCENE = new Scene();
const cameraObject = new GameObject({
    name: "Camera",
    engine,
})
cameraObject.addComponent(Camera);

GAME_SCENE.addGameObject(cameraObject);
GAME_SCENE.addGameObject(background);
GAME_SCENE.addGameObject(Player);
ground.forEach((grass) => { GAME_SCENE.addGameObject(grass) });

export default GAME_SCENE;