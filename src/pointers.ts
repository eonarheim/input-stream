

export class Pointers {
    public primaryId = 0;
    public currentFramePos = new Map<number, [number, number]>();
    public currentFrameDown = new Map<number, boolean>();

    constructor(public target: HTMLCanvasElement) {
        target.style.touchAction = 'none';

        target.addEventListener('pointerdown', this.handle)
        target.addEventListener('pointerup', this.handle)
        target.addEventListener('pointermove', this.handle)
        target.addEventListener('pointercancel', this.handle)
    }

    public handle = (evt: PointerEvent) => {
        evt.preventDefault();
        if (evt.isPrimary) {
            this.primaryId = evt.pointerId;
        }
        switch(evt.type) {
            case 'pointerdown':
                this.currentFrameDown.set(evt.pointerId, true);
                this.currentFramePos.set(evt.pointerId, [evt.offsetX, evt.offsetY]);
                break;
            case 'pointermove':
                this.currentFramePos.set(evt.pointerId, [evt.offsetX, evt.offsetY]);
                break;
            case 'pointerup':
                this.currentFrameDown.set(evt.pointerId, false);
                this.currentFramePos.delete(evt.pointerId);
                break;
            case 'pointercancel':
                this.currentFrameDown.set(evt.pointerId, false);
                this.currentFramePos.delete(evt.pointerId);
                break;
        }
    }

    isPointerDown(id: number = this.primaryId) {
        if (this.currentFrameDown.has(id)) {
            return this.currentFrameDown.get(id);
        }
        return false;
    }

    isPointerUp(id: number = this.primaryId) {
        if (!this.currentFrameDown.has(id)) {
            return true;
        }
        return !this.currentFrameDown.get(id);
    }

    getPointerLocation(id: number = this.primaryId) {
        if (this.currentFramePos.has(id)) {
            return this.currentFramePos.get(id);
        }
        return [0, 0];
    }
}