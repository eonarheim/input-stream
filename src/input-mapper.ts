import { Keyboard } from "./keyboard"
import { Gamepads } from "./gamepad"

export interface Inputs {
    keyboard: Keyboard;
    gamepads: Gamepads;
}

export class InputMapper {

    private _handlers = new Map<any, any>()
    constructor(public inputs: Inputs) {}

    execute() {
        for(const [input, command] of this._handlers.entries()) {
            const results = input(this.inputs);
            if (results) {
                command(results);
            }
        }
    }

    on<TData>(inputFunc: (inputs: Inputs) => TData | false, commandFunc: (data: TData) => any) {
        this._handlers.set(inputFunc, commandFunc);
    }
}