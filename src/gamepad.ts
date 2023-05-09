
/**
 * Gamepad Buttons enumeration
 */
export enum Buttons {
    /**
     * Face 1 button (e.g. A)
     */
    Face1 = 0,
    /**
     * Face 2 button (e.g. B)
     */
    Face2 = 1,
    /**
     * Face 3 button (e.g. X)
     */
    Face3 = 2,
    /**
     * Face 4 button (e.g. Y)
     */
    Face4 = 3,
    /**
     * Left bumper button
     */
    LeftBumper = 4,
    /**
     * Right bumper button
     */
    RightBumper = 5,
    /**
     * Left trigger button
     */
    LeftTrigger = 6,
    /**
     * Right trigger button
     */
    RightTrigger = 7,
    /**
     * Select button
     */
    Select = 8,
    /**
     * Start button
     */
    Start = 9,
    /**
     * Left analog stick press (e.g. L3)
     */
    LeftStick = 10,
    /**
     * Right analog stick press (e.g. R3)
     */
    RightStick = 11,
    /**
     * D-pad up
     */
    DpadUp = 12,
    /**
     * D-pad down
     */
    DpadDown = 13,
    /**
     * D-pad left
     */
    DpadLeft = 14,
    /**
     * D-pad right
     */
    DpadRight = 15
}

/**
 * Gamepad Axes enumeration
 */
export enum Axes {
    /**
     * Left analogue stick X direction
     */
    LeftStickX = 0,
    /**
     * Left analogue stick Y direction
     */
    LeftStickY = 1,
    /**
     * Right analogue stick X direction
     */
    RightStickX = 2,
    /**
     * Right analogue stick Y direction
     */
    RightStickY = 3
}

export class Gamepads {
    public gamepads = new Map<number, Gamepad>();
    constructor() {
        window.addEventListener('gamepadconnected', evt => {
            const gamepad = evt.gamepad;
            console.log("Connected", gamepad);
            this.gamepads.set(gamepad.index, new Gamepad(gamepad));
        });

        window.addEventListener('gamepaddisconnected', evt => {
            const gamepad = evt.gamepad;
            console.log('Disconnected', gamepad);
            this.gamepads.delete(gamepad.index);
        });
    }

    public get(index: number): Gamepad {
        if (!this.gamepads.has(index)) {
            this.gamepads.set(index, Gamepad.createEmpty(index));
        }
        return this.gamepads.get(index) as Gamepad;
    }

    public update() {
        const gamepadsSnapshot = navigator.getGamepads();
        for (const [index, gamepad] of this.gamepads.entries()) {
            const gamepad = gamepadsSnapshot[index];
            if (gamepad) {
                this.gamepads.set(index, new Gamepad(gamepad));
            }
        }
    }
}

export class Gamepad {
    static createEmpty (index: number) {
        return new Gamepad({
            axes: [],
            buttons: [],
            connected: false,
            hapticActuators: [],
            id: 'empty',
            index: index,
            mapping: 'standard',
            timestamp: performance.now()
        })
    }


    constructor(public nativeGamepad: globalThis.Gamepad) {

    }

    isButtonPressed(button: Buttons) {
        return this.nativeGamepad.buttons[button]?.pressed ?? false;
    }

    getButtonValue(button: Buttons) { 
        return this.nativeGamepad.buttons[button]?.value ?? 0;
    }

    getLeftStick(): [number, number] {
        const x = this.nativeGamepad.axes[Axes.LeftStickX] ?? 0;
        const y = this.nativeGamepad.axes[Axes.LeftStickY] ?? 0;

        return [
            Math.abs(x) > .05 ? x : 0,
            Math.abs(y) > .05 ? y : 0,
        ]
    }
    getRightStick(): [number, number] {
        const x = this.nativeGamepad.axes[Axes.RightStickX] ?? 0;
        const y = this.nativeGamepad.axes[Axes.RightStickY] ?? 0;

        return [
            Math.abs(x) > .05 ? x : 0,
            Math.abs(y) > .05 ? y : 0,
        ]
    }
}