import { Component, Vector2 } from "smurf-engine";

export class PlayerOcclusion extends Component {
    occlusionMinX = 0;
    occlusionMaxX = 0;
    differenceBetweenPlayerAndBoxX = 0;
    showStats = false;
    start() {
        this.occlusionMaxX = this.engine.canvas.width;
        this.differenceBetweenPlayerAndBoxX = this.gameObject.transform.position.x;
        this.transform.zIndex = 100;
    }

    update(): void {
        this.moveBoxWithPlayer();
        this.deactivateInvisibleGameObjects();

        let activeCount = 0;
        let inactiveCount = 0;
        this.engine.scene!.getAllGameObjects().forEach(gameObject => {
            if (gameObject.isActive) {
                activeCount++;
            } else {
                inactiveCount++;
            }
        });
        if (this.showStats) {
            this.cx.fillText(`Active: ${activeCount}`, 10 + this.occlusionMinX + 700, 20);
            this.cx.fillText(`Inactive: ${inactiveCount}`, 10 + this.occlusionMinX + 700, 40);
            this.cx.fillText(`Total: ${this.engine.scene!.getAllGameObjects().length}`, 10 + this.occlusionMinX + 700, 60);
        }
    }

    moveBoxWithPlayer() {
        this.occlusionMinX = this.gameObject.transform.position.x - this.differenceBetweenPlayerAndBoxX - 700;
        this.occlusionMaxX = this.occlusionMinX + (this.engine.canvas.width * 1.5);
    }

    deactivateInvisibleGameObjects() {
        this.engine.scene!.getAllGameObjects().forEach(gameObject => {
            if (gameObject.name === "Player" || gameObject.name === "Camera" || !gameObject.isStatic) {
                return;
            }
            if (gameObject.transform.position.x + gameObject.transform.size.x < this.occlusionMinX || gameObject.transform.position.x > this.occlusionMaxX) {
                gameObject.isActive = false;
            } else {
                gameObject.isActive = true;
            }
        });
    }
}