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

export class Gamepad {
    public gamepads: Map<number, globalThis.Gamepad> = new Map<number, globalThis.Gamepad>();
    
    constructor() {
        this.init();
    }
    
    public init() {
        window.addEventListener('gamepadconnected', evt => {
            const gamepad = evt.gamepad;
            this.gamepads.set(gamepad.index, gamepad);
        });

        window.addEventListener('gamepaddisconnected', evt => {
            const gamepad = evt.gamepad;
            this.gamepads.delete(gamepad.index);
        });
    }

    public update() {
        const gamepadSnapshot = navigator.getGamepads();
        for (const [index] of this.gamepads.entries()) {
            const gamepad = gamepadSnapshot[index];
            if (gamepad) {
                this.gamepads.set(index, gamepad)
            }
        }
    }
}