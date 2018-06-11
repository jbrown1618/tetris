import { Tetromino } from "./Tetromino";
import { cloneDeep } from "lodash";

export class State {
  public landed: number[][];
  public active: Tetromino;

  private next: Tetromino;
  private gameOver = false;

  constructor() {
    this.active = Tetromino.random();
    this.next = Tetromino.random();
    this.landed = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
  }

  public isGameOver() {
    return this.gameOver;
  }

  public tick() {
    this.active.moveDown();

    if (this.shouldLand()) {
      this.land();
    }

    let topRow = this.landed[0];
    for (let i = 0; i < topRow.length; i++) {
      if (topRow[i]) {
        this.gameOver = true;
      }
    }
  }

  public moveLeft() {
    this.active.moveLeft();
    if (this.isOffLeftEdge() || this.overlaps()) {
      this.active.moveRight();
    }
  }

  private isOffLeftEdge() {
    const currentCol = this.active.topLeft.col;
    return this.active.any((value, rowIndex, colIndex) => {
      return value && currentCol + colIndex < 0;
    });
  }

  public moveRight() {
    this.active.moveRight();
    if (this.isOffRightEdge() || this.overlaps()) {
      this.active.moveLeft();
    }
  }

  private isOffRightEdge() {
    const currentCol = this.active.topLeft.col;
    return this.active.any((value, rowIndex, colIndex) => {
      return value && currentCol + colIndex >= this.landed[0].length;
    });
  }

  private overlaps() {
    const currentRow = this.active.topLeft.row;
    const currentCol = this.active.topLeft.col;
    return this.active.any((value, rowIndex, colIndex) => {
      return (
        !!value &&
        this.isInBounds(currentRow + rowIndex, currentCol + colIndex) &&
        !!this.landed[currentRow + rowIndex][currentCol + colIndex]
      );
    });
  }

  public rotateClockwise() {
    let original = cloneDeep(this.active);
    this.active.rotateClockwise();

    if (this.overlaps()) {
      this.active = original;
      return;
    }

    while (this.isOffLeftEdge()) {
      this.active.moveRight();
      if (this.overlaps()) {
        this.active = original;
        return;
      }
    }

    while (this.isOffRightEdge()) {
      this.active.moveLeft();
      if (this.overlaps()) {
        this.active = original;
        return;
      }
    }
  }

  public rotateCounterClockwise() {
    let original = cloneDeep(this.active);
    this.active.rotateCounterClockwise();

    if (this.overlaps()) {
      this.active.rotateClockwise();
      return;
    }

    while (this.isOffLeftEdge()) {
      this.active.moveRight();
      if (this.overlaps()) {
        this.active = original;
        return;
      }
    }

    while (this.isOffRightEdge()) {
      this.active.moveLeft();
      if (this.overlaps()) {
        this.active = original;
        return;
      }
    }
  }

  public drop() {
    while (!this.shouldLand()) {
      this.active.moveDown();
    }
    this.land();
  }

  private shouldLand() {
    const currentRow = this.active.topLeft.row;
    const currentCol = this.active.topLeft.col;

    return this.active.any((value, rowIndex, colIndex) => {
      if (value) {
        if (currentRow + rowIndex >= this.landed.length - 1) {
          // hit the bottom
          return true;
        } else if (
          this.isInBounds(currentRow + rowIndex + 1, currentCol + colIndex) &&
          !!this.landed[currentRow + rowIndex + 1][currentCol + colIndex]
        ) {
          // directly above a landed tetromino
          return true;
        }
      }
      return false;
    });
  }

  private land() {
    const currentRow = this.active.topLeft.row;
    const currentCol = this.active.topLeft.col;

    this.active.forEach((value, rowIndex, colIndex) => {
      if (this.isInBounds(currentRow + rowIndex, currentCol + colIndex) && value) {
        this.landed[currentRow + rowIndex][currentCol + colIndex] += value;
      }
    });

    this.clearRows();

    this.active = this.next;
    this.next = Tetromino.random();
  }

  private clearRows() {
    for (let rowIndex = this.landed.length - 1; rowIndex >= 0; rowIndex--) {
      if (this.isFull(rowIndex)) {
        this.clearRow(rowIndex);
        rowIndex++;
      }
    }
  }

  private isFull(rowIndex: number) {
    let full = true;
    for (let colIndex = 0; colIndex < this.landed[rowIndex].length; colIndex++) {
      if (this.landed[rowIndex][colIndex] === 0) {
        full = false;
        break;
      }
    }
    return full;
  }

  private clearRow(initialRowIndex: number) {
    for (let rowIndex = initialRowIndex; rowIndex >= 0; rowIndex--) {
      for (let colIndex = 0; colIndex < this.landed[rowIndex].length; colIndex++) {
        if (rowIndex === 0) {
          this.landed[rowIndex][colIndex] = 0;
        } else {
          this.landed[rowIndex][colIndex] = this.landed[rowIndex - 1][colIndex];
        }
      }
    }
  }

  private isInBounds(rowIndex: number, colIndex: number) {
    return (
      rowIndex >= 0 &&
      rowIndex < this.landed.length &&
      colIndex >= 0 &&
      colIndex < this.landed[0].length
    );
  }
}
