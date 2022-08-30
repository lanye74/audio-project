export default async function processAudioFile(file) {
    const audioUrl = URL.createObjectURL(file); // turn the file contents into something accessible
    const audioElement = new Audio(audioUrl);
    const audioLength = await new Promise(resolve => {
        audioElement.addEventListener("durationchange", () => {
            resolve(audioElement.duration);
        }, { once: true });
    });
    const fileReader = new FileReader();
    const rawBuffer = await new Promise(resolve => {
        fileReader.onload = () => alert("load!");
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.readAsArrayBuffer(file);
    });
    // alert(rawBuffer.byteLength)
    try {
        const arrayBufferElements = Math.ceil(rawBuffer.byteLength / 4);
        // setting length manually is necessary because it must be a multiple of 4
        const dataBuffer = new Float32Array(rawBuffer, 0, arrayBufferElements + (4 - arrayBufferElements % 4));
    }
    catch (e) {
        alert(e);
    }
    const dataBuffer = new Float32Array();
    return {
        audioLength,
        audioElement,
        dataBuffer
    };
}