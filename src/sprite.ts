export interface SpriteOptions {
    img: HTMLImageElement;
    view: {
        x: number; y: number; width: number; height: number;
    };
}

export class Sprite {
    options: SpriteOptions
    constructor(options: SpriteOptions) {
        this.options = options;
    }
    draw(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
        const {x: srcX, y: srcY, width: srcWidth, height: srcHeight} = this.options.view;
        ctx.drawImage(this.options.img,
            srcX, srcY, srcWidth, srcHeight,
            x, y, width, height)
    }
}