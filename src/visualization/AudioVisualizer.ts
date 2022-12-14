import AudioPlayer from "../AudioPlayer.js";
import BackgroundAnimator from "./BackgroundAnimator.js";
import FrameInterpreter from "./FrameInterpreter.js";
import SeekbarManager from "../dom/SeekbarManager.js";
import TimeInterpreter from "./TimeInterpreter.js";
import WaveformAnimator from "./WaveformAnimator.js";

import type {BeatData} from "../types.js";



export default class AudioVisualizer {
	private static requestId: number;

	static init(analyzer: AnalyserNode, beatData: BeatData, ctx: CanvasRenderingContext2D) {
		BackgroundAnimator.init(ctx);
		WaveformAnimator.init(analyzer, ctx);

		TimeInterpreter.init(beatData);
		FrameInterpreter.init(beatData);
	}

	static start() {
		requestAnimationFrame(this.loop.bind(this));
	}

	static loop() {
		const time = AudioPlayer.getTime();
		const progress = AudioPlayer.getProgress();

		BackgroundAnimator.draw(time);
		WaveformAnimator.draw();

		SeekbarManager.requestUpdate(progress);

		this.requestId = requestAnimationFrame(this.loop.bind(this));
	}

	static stop() {
		cancelAnimationFrame(this.requestId);
	}
}
