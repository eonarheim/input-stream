

export class Keyboard {
    public keys: string[] = [];
    public keysDown: string[] = [];
    public keysUp: string[] = [];
    constructor() {
        document.addEventListener('keydown', evt => {
            const index = this.keys.indexOf(evt.code);
            if (index === -1) {
                this.keys.push(evt.code);
            }
            const indexDown = this.keysDown.indexOf(evt.code);
            if (indexDown === -1) {
                this.keysDown.push(evt.code);
            }
        });

        document.addEventListener('keyup', evt => {
            const index = this.keys.indexOf(evt.code);
            if (index > -1) {
                this.keys.splice(index, 1);
            }

            const indexUp = this.keysUp.indexOf(evt.code);
            if (indexUp === -1) {
                this.keysUp.push(evt.code);
            }
        });
    }

    clear() {
        this.keysDown.length = 0;
        this.keysUp.length = 0;
    }

    /**
     * "KeyQ" "ArrowDown"
     * @param code 
     */
    isKeyPressed(code: string) {
        return this.keys.indexOf(code) > -1;
    }

    isKeyUp(code: string) {
        return this.keysUp.indexOf(code) > -1;
    }
    
    isKeyDown(code: string) {
        return this.keysDown.indexOf(code) > -1;
    }
}