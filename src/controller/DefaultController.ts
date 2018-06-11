import { BooleanSupplier, Controller, Runnable } from "./Controller";

export class DefaultController implements Controller {
  attach(
    tick: Runnable,
    moveLeft: Runnable,
    moveRight: Runnable,
    rotateClockwise: Runnable,
    rotateCounterClockwise: Runnable,
    drop: Runnable,
    render: Runnable,
    isGameOver: BooleanSupplier
  ): void {
    console.log("Started the game!");

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 37: // LEFT
          moveLeft();
          break;
        case 39: // RIGHT
          moveRight();
          break;
        case 38: // UP
          rotateClockwise();
          break;
        case 40: // DOWN
          rotateCounterClockwise();
          break;
        case 32: // SPACE
          drop();
          break;
        default:
          // Do nothing
          return;
      }
      render();
    };

    document.addEventListener("keydown", onKeyDown);

    const intervalId = window.setInterval(() => {
      tick();
      render();

      if (isGameOver()) {
        window.clearInterval(intervalId);
        document.removeEventListener("keydown", onKeyDown);
        console.log("Game Over!");
      }
    }, 500);
  }
}
