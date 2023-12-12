import { Component, Vector2 } from "smurf-engine";

export class PlayerOcclusion extends Component {
    radius = 1200;
    showStats = false;
    start() {
        this.transform.zIndex = 100;
    }

    update(): void {
        this.deactivateInvisibleGameObjects();

        if (this.showStats) {
            let activeCount = 0;
            let inactiveCount = 0;
            this.engine.scene!.getAllGameObjects().forEach(gameObject => {
                if (gameObject.isActive) {
                    activeCount++;
                } else {
                    inactiveCount++;
                }
            });
            this.cx.fillText(`Active: ${activeCount}`,this.transform.position.x, 20);
            this.cx.fillText(`Inactive: ${inactiveCount}`, 10 + this.transform.position.x, 40);
            this.cx.fillText(`Total: ${this.engine.scene!.getAllGameObjects().length}`, 10 + this.transform.position.x, 60);

            // show circle around player
            this.cx.beginPath();
            let playerCenter = new Vector2(this.gameObject.transform.position.x + this.gameObject.transform.size.x / 2, this.gameObject.transform.position.y + this.gameObject.transform.size.y / 2);
            this.cx.arc(playerCenter.x, playerCenter.y, this.radius, 0, 2 * Math.PI);
            this.cx.fillStyle = "rgba(255, 0, 0, 0.2)";
            this.cx.fill();
        }
    }

    deactivateInvisibleGameObjects() {
        this.engine.scene!.getAllGameObjects().forEach(gameObject => {
            if (gameObject.name === "Player" || gameObject.name === "Camera" || !gameObject.isStatic) {
                return;
            }
            // calculate distance between player and gameObject
            let playerCenter = new Vector2(this.gameObject.transform.position.x + this.gameObject.transform.size.x / 2, this.gameObject.transform.position.y + this.gameObject.transform.size.y / 2);
            let distanceX = Math.abs(gameObject.transform.position.x - playerCenter.x);
            let distanceY = Math.abs(gameObject.transform.position.y - this.gameObject.transform.position.y);
            let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distance > this.radius) {
                gameObject.isActive = false;
            } else {
                gameObject.isActive = true;
            }
        });
    }
}