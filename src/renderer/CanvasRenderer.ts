import {Renderer} from "./Renderer";
import {State} from "../State";
import {cloneDeep} from "lodash";

const BLOCK_SIZE = 50;
const BORDER_SIZE = 2;

export class CanvasRenderer implements Renderer {
    context: CanvasRenderingContext2D;

    constructor () {
        let canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.height = BLOCK_SIZE * 16;
        canvas.width = BLOCK_SIZE * 10;

        this.context = canvas.getContext('2d');

        document.body.appendChild(canvas);
    }

    render: (state: State) => void = function (state: State) {
        let copy: State = cloneDeep(state);

        const currentRow = copy.active.topLeft.row;
        const currentCol = copy.active.topLeft.col;

        copy.active.forEach((value, rowIndex, colIndex) => {
            if (value && currentRow + rowIndex >= 0 &&
                currentRow + rowIndex < copy.landed.length &&
                currentCol + colIndex >= 0 &&
                currentCol + colIndex < copy.landed[0].length) {

                copy.landed[currentRow + rowIndex][currentCol + colIndex] = value;
            }
        });

        for (let r = 0; r < copy.landed.length; r++) {
            for (let c = 0; c < copy.landed[r].length; c++) {
                let value = copy.landed[r][c];
                let innerColor;
                let outerColor;
                switch (value) {
                    case 1:
                        innerColor = "#ff0203";
                        outerColor = "#bf0203";
                        break;
                    case 2:
                        innerColor = "#2104ff";
                        outerColor = "#1904b8";
                        break;
                    case 3:
                        innerColor = "#04e9ff";
                        outerColor = "#04acc2";
                        break;
                    case 4:
                        innerColor = "#0eff20";
                        outerColor = "#0ecb1e";
                        break;
                    case 5:
                        innerColor = "#fffd06";
                        outerColor = "#e1df06";
                        break;
                    case 6:
                        innerColor = "#b206ff";
                        outerColor = "#7d06c5";
                        break;
                    case 7:
                        innerColor = "#ff9b08";
                        outerColor = "#e07e08";
                        break;
                    default:
                        innerColor = "#d1d1d1";
                        outerColor = "#bebebe";

                }
                this.context.fillStyle = outerColor;
                this.context.fillRect(
                    BLOCK_SIZE * c,
                    BLOCK_SIZE * r,
                    BLOCK_SIZE,
                    BLOCK_SIZE
                );

                this.context.fillStyle = innerColor;
                this.context.fillRect(
                    BLOCK_SIZE * c + BORDER_SIZE,
                    BLOCK_SIZE * r + BORDER_SIZE,
                    BLOCK_SIZE - BORDER_SIZE * 2,
                    BLOCK_SIZE - BORDER_SIZE * 2
                );
            }
        }
    }
}
