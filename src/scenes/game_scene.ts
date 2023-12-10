import { Camera, GameObject, Scene } from "smurf-engine";
import { engine } from "../setup";
import AssetManager from "../assets/asset_manager";
import { Player } from "./game_scene/game_objects/player";
import background from "./game_scene/game_objects/background";

engine.assetPipeline.addToLoad(...AssetManager.getSheets.player.idle, AssetManager.getSprites.background);

const GAME_SCENE = new Scene();
const cameraObject = new GameObject({
    name: "Camera",
    engine,
})
cameraObject.addComponent(Camera);

GAME_SCENE.addGameObject(cameraObject);
GAME_SCENE.addGameObject(background);
GAME_SCENE.addGameObject(Player);

export default GAME_SCENE;