import { BoxCollider, GameObject, Physics2D, SpriteRenderer, SpriteSheetAnimator, Vector2 } from "smurf-engine";
import { engine } from "../../../setup";
import AssetManager from "../../../assets/asset_manager";
import PlayerMovement from "./components/player_movement";
import { PlayerCameraFollower } from "./components/player_camera_follower";

export const Player = new GameObject({
    name: 'Player',
    engine,
});

Player.transform.position = new Vector2(300, 300);
Player.transform.size = new Vector2(100, 100);

Player.addComponent(SpriteRenderer).constructSpriteFromSource(AssetManager.getSheets.player.idle[0]);
Player.addComponent(BoxCollider);
let animator = Player.addComponent(SpriteSheetAnimator);
animator.sprites = AssetManager.getSheets.player.idle;
animator.pauseDurationInSeconds = 2;
animator.framesPerSecond = 5;

Player.addComponent(Physics2D);
Player.addComponent(PlayerMovement);
Player.addComponent(PlayerCameraFollower);