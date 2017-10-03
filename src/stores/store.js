export default {
  isAdmin: true,
  cordova: {
    isApp: false,
    isActive: false,
  },
  audio: {
    description: {
      dataUrl: '',
      blob: '',
      length: '',
      previous: {
        dataUrl: '',
        blob: '',
      },
    },
    review: {
      dataUrl: '',
      blob: '',
      length: '',
      previous: {
        dataUrl: '',
        blob: '',
      },
    },
  },
  saveData(source, blob, dataUrl) {
    this.audio[source].dataUrl = dataUrl;
    this.audio[source].blob = blob;
  },
  updateData(source, blob, dataUrl) {
    this.audio[source].previous.dataUrl = this.audio[source].dataUrl;
    this.audio[source].previous.blob = this.audio[source].blob;
    this.saveData(source, blob, dataUrl);
  },
  restoreData(source) {
    this.audio[source].dataUrl = this.audio[source].previous.dataUrl;
    this.audio[source].blob = this.audio[source].previous.blob;
  },
  getDataUrl(source) {
    if (source === 'description') {
      return this.audio.description.dataUrl;
    }
    return this.audio.review.dataUrl;
  },
};
