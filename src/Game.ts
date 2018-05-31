import {State} from "./State";
import {Renderer} from "./renderer/Renderer";

export class Game {
    private state: State;

    constructor(private renderer: Renderer) {
        this.state = new State();
    }

    public start() {
        console.log("Started the game!");

        document.addEventListener("keydown", this.handleKeyDown);

        let intervalId = window.setInterval(() => {
            this.state.tick();
            this.renderer.render(this.state);

            if (this.state.gameOver) {
                window.clearInterval(intervalId);
                document.removeEventListener("keydown", this.handleKeyDown);
                console.log("Game Over!");
            }
        }, 500);
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        switch (event.keyCode) {
            case 37: // LEFT
                this.state.moveLeft();
                this.renderer.render(this.state);
                return;
            case 39: // RIGHT
                this.state.moveRight();
                this.renderer.render(this.state);
                return;
            case 38: // UP
                this.state.rotateClockwise();
                this.renderer.render(this.state);
                return;
            case 40: // DOWN
                this.state.rotateCounterClockwise();
                this.renderer.render(this.state);
                return;
            case 32: // SPACE
                this.state.drop();
                this.renderer.render(this.state);
                return;
            default:
                // Do nothing
                return;
        }
    }

}
