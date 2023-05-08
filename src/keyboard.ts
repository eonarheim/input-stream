export class Keyboard {
    keys: string[] = [];
    constructor() {
        document.addEventListener('keydown', (ev: KeyboardEvent) => {
            const index = this.keys.indexOf(ev.code);
            if (index === -1) {
                this.keys.push(ev.code);
            }
        });
        document.addEventListener('keyup', (ev: KeyboardEvent) => {
            const index = this.keys.indexOf(ev.code);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
        })
    }

    isPressed(keyCode: string) {
        return this.keys.indexOf(keyCode) > -1;
    }
}