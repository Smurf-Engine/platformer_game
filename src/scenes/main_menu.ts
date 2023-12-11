import { Scene } from "smurf-engine";
import { engine } from "../setup";
import AssetManager from "../assets/asset_manager";
import menu_background from "./menu/menu_bg";
import { SnowLayer } from "./menu/star_sky";

engine.assetPipeline.addToLoad(AssetManager.getSprites.background);

const MAIN_MENU = new Scene();

MAIN_MENU.addGameObject(menu_background,SnowLayer);
export default MAIN_MENU;