import {isPlusOrMinus} from "./util.js";



type AudioBufferResolver = (buffer: Promise<AudioBuffer>) => any;

type RenderCallback = (progress: number) => any;



export default class OACRenderer {
	private buffer!: Promise<AudioBuffer>;
	private bufferLength: number;

	private currentProgress = 0;
	private offlineContext: OfflineAudioContext;

	private progressEvent!: RenderCallback;
	private resolve!: AudioBufferResolver;

	constructor(offlineContext: OfflineAudioContext) {
		// this.buffer = offlineContext.startRendering();

		this.bufferLength = offlineContext.length / offlineContext.sampleRate;
		this.offlineContext = offlineContext;
	}

	setOnProgress(progressEvent: RenderCallback) {
		this.progressEvent = progressEvent;
	}

	async render() {
		return new Promise<AudioBuffer>(resolve => {
			this.buffer = this.offlineContext.startRendering();

			this.resolve = resolve;

			// ensure "this" stays bound
			// alternatively, () => this.check() would work
			requestAnimationFrame(this.checkProgress.bind(this));
		});
	}

	private checkProgress() {
		this.currentProgress = this.offlineContext.currentTime / this.bufferLength;

		if(isPlusOrMinus(this.currentProgress, 1, 0.001)) {
			// not entirely precise math, just round
			this.currentProgress = 1;

			this.progressEvent(this.currentProgress);
			this.resolve(this.buffer);
			return;
		}

		this.progressEvent(this.currentProgress);


		requestAnimationFrame(this.checkProgress.bind(this));
	}
}
