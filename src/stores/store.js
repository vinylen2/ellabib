export default {
  cordova: {
    isApp: false,
    isActive: false,
  },
  audio: {
    description: {
      dataUrl: '',
      blob: '',
      length: '',
    },
    review: {
      dataUrl: '',
      blob: '',
      length: '',
    },
  },
  saveData(source, blob, timerLength) {
    this.audio[source].dataUrl = URL.createObjectURL(blob);
    this.audio[source].blob = blob;
    this.audio[source].length = timerLength;
  },
  getDataUrl(source) {
    if (source === 'description') {
      return this.audio.description.dataUrl;
    }
    return this.audio.review.dataUrl;
  },
  getRecordingLength(source) {
    if (source === 'description') {
      return this.audio.description.length;
    }
    return this.audio.review.length;
  },
  getBytesPerSecond(source) {
    return this.audio[source].bytesPerSecond;
  },
};
