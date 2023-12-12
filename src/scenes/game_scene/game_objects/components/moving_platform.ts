import { Component, GameObject, Vector2 } from "smurf-engine";

enum MovingPlatformDirection{
    Left,
    Right,
}

export class MovingPlatform extends Component{
    startPosition = this.gameObject.transform.position;
    endPosition : Vector2 = new Vector2(0, 0);
    direction = MovingPlatformDirection.Right;
    speed = .95;
    touchingGameObject?: GameObject;

    start(): void {
        this.startPosition = new Vector2(this.gameObject.transform.position.x, this.gameObject.transform.position.y);
        this.transform.position.x = this.endPosition.x;
    }

    update(): void {
        if(this.direction == MovingPlatformDirection.Right){
            this.gameObject.transform.position.x += this.speed;
        }else if(this.direction == MovingPlatformDirection.Left){
            this.gameObject.transform.position.x -= this.speed;
        }
        this.calculateDirection();

        if(this.touchingGameObject){
            this.touchingGameObject.transform.position.x += this.speed * (this.direction == MovingPlatformDirection.Right ? 1 : -1);
        }
    }

    calculateDirection(){
        if (this.direction == MovingPlatformDirection.Right && this.gameObject.transform.position.x > this.endPosition.x) {
            this.direction = MovingPlatformDirection.Left;
        }
        if (this.direction == MovingPlatformDirection.Left && this.gameObject.transform.position.x < this.startPosition.x) {
            this.direction = MovingPlatformDirection.Right;
        }
    }

    setEndPosition(position: Vector2){
        this.endPosition = position;
    }

    onCollisionEnter(other: GameObject): void {
        this.touchingGameObject = other;
    }

    onCollisionExit(): void {
        this.touchingGameObject = undefined;
    }
}