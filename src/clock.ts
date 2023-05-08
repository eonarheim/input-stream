import { FpsSampler } from "./fps-sampler";


export class Clock {
    public fpsSampler = new FpsSampler({
        initialFps: 60,
        nowFn: () => performance.now()
    });
    private lastTimeMs: number = performance.now();
    running: boolean = false;
    constructor(public step: (elapsedMs: number) => any, private maxFps: number = Infinity) {}

    mainloop(nowMs: number) {
        if (!this.running) {
            return;
        }
        requestAnimationFrame(this.mainloop.bind(this));
        this.fpsSampler.start()

        let elapsedMs = nowMs - this.lastTimeMs;

        const fpsIntervalMs = 1000 / this.maxFps;

        if (elapsedMs >= fpsIntervalMs) {
            let leftovers = 0;
            if (fpsIntervalMs !== 0) {
                leftovers = (elapsedMs % fpsIntervalMs);
                elapsedMs = elapsedMs - leftovers;
            }

            this.step(elapsedMs);

            if (fpsIntervalMs !== 0) {
                this.lastTimeMs = nowMs - leftovers
            } else {
                this.lastTimeMs = nowMs;
            }
            this.fpsSampler.end();
        } else {
            // skip the frame
        }

        
    }

    start() {
        this.running = true;
        this.mainloop(performance.now());
    }

    stop() {
        this.running = false;
    }
}