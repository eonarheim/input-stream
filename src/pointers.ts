export type NativePointerEvent = globalThis.PointerEvent;
export type NativeMouseEvent = globalThis.MouseEvent;
export type NativeTouchEvent = globalThis.TouchEvent;


export class Pointers {
    public currentPointerPos = new Map<number, [number, number]>();
    public currentPointerDown = new Map<number, boolean>();

    public currentFrameDown: PointerEvent[] = [];
    public currentFrameUp: PointerEvent[] = [];
    public currentFrameMove: PointerEvent[] = [];
    public currentFrameCancel: PointerEvent[] = [];
    constructor(public target: GlobalEventHandlers & EventTarget) {
        this.init();
    }

    isPointerDown() {
        if (this.currentPointerDown.has(0)){
            return this.currentPointerDown.get(0);
        }
        return false;
    }

    isPointerUp() {
        if (!this.currentPointerDown.has(0)){
            return true;
        }
        return !this.currentPointerDown.get(0);
    }

    getCurrentPointerPos(){
        if (this.currentPointerPos.has(0)) {
            return this.currentPointerPos.get(0);
        }
        return [0, 0];
    }

    update() {
        this.currentFrameDown.length = 0;
        this.currentFrameUp.length = 0;
        this.currentFrameMove.length = 0;
        this.currentFrameCancel.length = 0;
    }


    private _handle = (ev: NativePointerEvent) => {
        ev.preventDefault();
        switch(ev.type) {
            case 'pointerdown':
                this.currentFrameDown.push(ev);
                this.currentPointerPos.set(ev.pointerId, [ev.offsetX, ev.offsetY])
                this.currentPointerDown.set(ev.pointerId, true);
                break;
            case 'pointerup':
                this.currentFrameUp.push(ev);
                this.currentPointerPos.delete(ev.pointerId);
                this.currentPointerDown.set(ev.pointerId, false);
                break;
            case 'pointermove':
                this.currentFrameMove.push(ev);
                this.currentPointerPos.set(ev.pointerId, [ev.offsetX, ev.offsetY])
                break;
            case 'pointercancel':
                this.currentFrameCancel.push(ev);
                this.currentPointerPos.delete(ev.pointerId);
                break;
        }
    }

    init () {
        // Disabling the touch action avoids browser/platform gestures from firing on the canvas
        // It is important on mobile to have touch action 'none'
        // https://stackoverflow.com/questions/48124372/pointermove-event-not-working-with-touch-why-not
        if (this.target instanceof HTMLCanvasElement) {
            this.target.style.touchAction = 'none';
        } else {
            document.body.style.touchAction = 'none';
        }
        // Preferred pointer events
        this.target.addEventListener('pointerdown', this._handle);
        this.target.addEventListener('pointerup', this._handle);
        this.target.addEventListener('pointermove', this._handle);
        this.target.addEventListener('pointercancel', this._handle);
    }
}