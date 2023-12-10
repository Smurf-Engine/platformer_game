import { DOMUILayer, GameObject } from "smurf-engine";
import { engine } from "../../setup";
import { UIManager } from "./game_objects/components/ui_manager";

const game_ui = new GameObject({
    name: "Game UI",
    engine,
});

game_ui.addComponent(DOMUILayer);
game_ui.addComponent(UIManager);

export default game_ui;