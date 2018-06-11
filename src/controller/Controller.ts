export type Runnable = () => void;
export type BooleanSupplier = () => boolean;

export interface Controller {
  attach(
    tick: Runnable,
    moveLeft: Runnable,
    moveRight: Runnable,
    rotateClockwise: Runnable,
    rotateCounterClockwise: Runnable,
    drop: Runnable,
    render: Runnable,
    isGameOver: BooleanSupplier
  ): void;
}
