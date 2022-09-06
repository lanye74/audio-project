export default function computeBeats(buffer: AudioBuffer) {
	const channelData = buffer.getChannelData(0);

	const maximumValue = getMaximumValue(channelData);


}



function getMaximumValue(channelData: Float32Array) {
	let maximumValue = 0;

	const length = channelData.length;

	for(let i = 0; i < length; i++) {
		if(channelData[i] > maximumValue) {
			maximumValue = channelData[i];
		}
	}

	return maximumValue;
}
