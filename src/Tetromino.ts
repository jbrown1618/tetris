export class Tetromino {
  private static shapes: { [key: string]: number[][] } = {
    I: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    O: [[0, 0, 0, 0], [0, 2, 2, 0], [0, 2, 2, 0], [0, 0, 0, 0]],
    L: [[0, 3, 0, 0], [0, 3, 0, 0], [0, 3, 3, 0], [0, 0, 0, 0]],
    J: [[0, 0, 4, 0], [0, 0, 4, 0], [0, 4, 4, 0], [0, 0, 0, 0]],
    S: [[0, 5, 0, 0], [0, 5, 5, 0], [0, 0, 5, 0], [0, 0, 0, 0]],
    Z: [[0, 0, 6, 0], [0, 6, 6, 0], [0, 6, 0, 0], [0, 0, 0, 0]],
    T: [[0, 7, 0, 0], [0, 7, 7, 0], [0, 7, 0, 0], [0, 0, 0, 0]]
  };

  public static random() {
    let letters = Object.keys(Tetromino.shapes);
    let index = Math.floor(Math.random() * letters.length);
    let tetromino = new Tetromino(Tetromino.shapes[letters[index]]);

    let rotations = Math.floor(Math.random() * 3);
    for (let i = 0; i < rotations; i++) {
      tetromino.rotateClockwise();
    }

    return tetromino;
  }

  shape: number[][];
  topLeft: { row: number; col: number };

  constructor(shape: number[][]) {
    this.shape = shape;
    this.topLeft = {
      row: -4,
      col: 4
    };
  }

  public moveLeft() {
    this.topLeft.col--;
  }

  public moveRight() {
    this.topLeft.col++;
  }

  public moveDown() {
    this.topLeft.row++;
  }

  public rotateClockwise() {
    let newShape: number[][] = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.forEach((value, rowIndex, colIndex) => {
      newShape[colIndex][3 - rowIndex] = value;
    });
    this.shape = newShape;
  }

  public rotateCounterClockwise() {
    this.rotateClockwise();
    this.rotateClockwise();
    this.rotateClockwise();
  }

  public forEach(
    fn: (value: number, rowIndex: number, colIndex: number) => void
  ) {
    for (let rowIndex = 0; rowIndex < this.shape.length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < this.shape[rowIndex].length;
        colIndex++
      ) {
        fn(this.shape[rowIndex][colIndex], rowIndex, colIndex);
      }
    }
  }

  public any(
    fn: (value: number, rowIndex: number, colIndex: number) => boolean
  ) {
    let anyTrue = false;
    this.forEach((value, rowIndex, colIndex) => {
      if (fn(value, rowIndex, colIndex)) {
        anyTrue = true;
      }
    });
    return anyTrue;
  }
}
