import { GAME_SCENE } from "./scenes/game_scene";
import { engine } from "./setup";

window.onload = () => {
  engine.loadScene(GAME_SCENE);
};