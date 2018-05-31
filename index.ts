import { Game } from "./src/Game";
import { CanvasRenderer } from "./src/renderer/CanvasRenderer";

let game: Game = new Game(new CanvasRenderer());

game.start();
