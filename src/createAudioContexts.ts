export function createAudioContext(audioElement: HTMLAudioElement, frequencyCount: number) {
	const audioContext = new AudioContext();
	const audioSource = audioContext.createMediaElementSource(audioElement);


	const audioFrequencyAnalyzer = audioContext.createAnalyser();
	audioFrequencyAnalyzer.fftSize = frequencyCount * 2; // frequencyBinCount * 2 = fftSize
	// audioFrequencyAnalyzer.smoothingTimeConstant = 0;


	audioSource.connect(audioFrequencyAnalyzer);
	audioSource.connect(audioContext.destination);


	return audioFrequencyAnalyzer;
}



export function createOfflineAudioContext(audioBuffer: AudioBuffer) {
	const offlineContext = new OfflineAudioContext({
		numberOfChannels: 1,
		length: audioBuffer.length,
		sampleRate: audioBuffer.sampleRate
	});


	const offlineSource = offlineContext.createBufferSource();
	offlineSource.buffer = audioBuffer;

	const offlineBeatFilter = offlineContext.createBiquadFilter();
	offlineBeatFilter.type = "lowpass";


	offlineSource.connect(offlineBeatFilter).connect(offlineContext.destination);

	offlineSource.start();


	return offlineContext;
}
