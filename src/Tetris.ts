import { State } from "./State";
import { Renderer } from "./renderer/Renderer";
import { Controller } from "./controller/Controller";

export class Tetris {
  private state: State;
  private renderer: Renderer;
  private controller: Controller;

  constructor(renderer: Renderer, controller: Controller) {
    this.state = new State();
    this.renderer = renderer;
    this.controller = controller;
  }

  public start() {
    this.controller.attach(
      () => this.state.tick(),
      () => this.state.moveLeft(),
      () => this.state.moveRight(),
      () => this.state.rotateClockwise(),
      () => this.state.rotateCounterClockwise(),
      () => this.state.drop(),
      () => this.renderer.render(this.state),
      () => this.state.isGameOver()
    );
  }
}
