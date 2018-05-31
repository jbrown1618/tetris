import {State} from "../State";

export interface Renderer {
    render: (state: State) => void;
}
