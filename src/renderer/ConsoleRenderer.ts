import {Renderer} from "./Renderer";
import {State} from "../State";
import {cloneDeep} from "lodash";

export class ConsoleRenderer implements Renderer {
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

        console.log('* * * * * * * * * * *\n' +
            copy.landed.map(
                row => '*' + row.map(value => value || ' ').join(' ') + '*'
            ).join('\n') +
            '\n* * * * * * * * * * *'
        );
    }
}
