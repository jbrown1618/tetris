import { Tetris } from "./src/Tetris";
import { CanvasRenderer } from "./src/renderer/CanvasRenderer";
import { DefaultController } from "./src/controller/DefaultController";

let game: Tetris = new Tetris(new CanvasRenderer(), new DefaultController());

game.start();
