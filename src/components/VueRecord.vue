<template>
  <div>
    <div v-show="!isEditing">
      <button class="button stop"
        v-show="isRecording"
        @click="stopRecording"><icon name="stop" scale="2"></icon>
      </button>
      <button class="button record"
        v-show="!isRecording"
        @click="startRecording"><icon name="microphone" scale="2"></icon>
      </button>
      <div class="counter"
        v-show="isRecording">
        {{recordingLength}}
      </div>
    </div>
    <audio-editor class="editor"
      ref="editor"
      v-if="dataUrl.length > 0"
      @cut="updateData"
      @trashRecording="trashRecording"
      :dataUrl="dataUrl"
      :source="source"
      :isEditing="isEditing">
    </audio-editor>
  </div>
</template>

<script>
/* eslint-disable */
import RecordRTC from 'recordrtc';
import Store from '@/stores/store';
import timer from 'minimal-timer';
import AudioEditor from '@/components/AudioEditor';
import Icon from 'vue-awesome';

export default {
  components: {
    'audio-editor': AudioEditor,
    Icon,
  },
  props: {
    blob: '',
    source: '',
    options: {
      default() {
        return {
          type: 'audio',
          mimeType: 'video/webm',
          bufferSize: 0,
          sampleRate: 44100,
          leftChannel: false,
          disableLogs: false,
        }
      }
    }
  },
  data() {
    return {
      localBlob: this.blob,
      dataUrl: '',
      maxLength: 30,
      Timer: timer(),
      recordingLength: '',
      isRecording: false,
      isEditing: false,
      newRecording: 0
    }
  },
  watch: {
    recordingLength() {
      if (this.recordingLength > this.maxLength) {
        this.stopRecording();
      };
    },
  },
  methods: {
    trashRecording() {
      this.isEditing = false;
      this.dataUrl = '';
      this.$emit('updateBlob', null, this.source);
    },
    updateData(blob) {
      this.dataUrl = URL.createObjectURL(blob);
      this.localBlob = blob;
      this.$emit('updateBlob', blob, this.source);
    },
    startTimer() {
      this.Timer.start();
      this.recordingLength = 0;
      this.interval = window.setInterval(() => {
        const time = this.Timer.elapsedTime();
        this.recordingLength = (time / 1000).toFixed(1);
      }, 500);
    },
    stopTimer(blob) {
      this.updateData(blob);
      window.clearInterval(this.interval);
      this.isEditing = true;
    },
    captureUserMedia(mediaConstraints, successCallback, errorCallback) {
      var isBlackBerry = !!(/BB10|BlackBerry/i.test(navigator.userAgent || ''));
      if(isBlackBerry && !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices.getUserMedia || navigator.mozGetUserMedia)) {
          navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
          navigator.getUserMedia(mediaConstraints, successCallback, errorCallback);
          return
      }
      navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback)
    },
    _addStreamStopListener(stream, callback) {
      var streamEndedEvent = 'ended'

      if ('oninactive' in stream) {
        streamEndedEvent = 'inactive'
      }

      this._stream.addEventListener(streamEndedEvent, function() {
        callback()
        callback = function() {}
      }, false)

      this._stream.getAudioTracks().forEach(function(track) {
        track.addEventListener(streamEndedEvent, function() {
          callback()
          callback = function() {}
        }, false)
      })
    },
    // CORE
    startRecording() {
      this.captureUserMedia(
        { audio: true },
        (audioStream) => {
          this.$emit('record:start')
          this.isRecording = true
          this._stream = audioStream
          this._recordRTC = RecordRTC(audioStream, this.options)
          this._recordRTC.startRecording()

          this._addStreamStopListener(audioStream, () => {
            this.isRecording = false
          })
        },
        (error) => {
          this.$emit('record:error')
          this.isRecording = false
        });
        this.startTimer();

    },
    stopRecording() {
      // commented out url in stopRecording
      this._recordRTC.stopRecording(() => {
        this._stream.stop()
        // this.$emit('record:success', url)
        // this.dataUrl = url;

        // save Blob and Blob URL to Store for API post, playback and editing
        // this.saveToStore(this._recordRTC.getBlob());
        this.stopTimer(this._recordRTC.getBlob());
      });
      // removed this to fix getBlob() function above
      // this._recordRTC = null
    },
    // using component audio-editor for playback
    // playbackAudio() {
    //   // implement toggle playback here
    //   var audio = new Audio()
    //   audio.src = this.dataUrl();
    //   audio.controls = true
    //
    //   audio.play();
    //
    //   audio.onended = function() {
    //     audio.pause();
    //   };
    // },
    deleteRecording() {
      this.isEditing = false;
    },
  },
  destroyed() {
    this.stopRecording()
  }
}

</script>

<style scoped>
.button {
  border: none;
  padding: 0;
  margin: 10px;
  font-weight: bold;
  font-size: 2em;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: #9ddad8;
  text-align: center;
  cursor:pointer;
}

.counter {
  font-size: 2em;
  margin: 10px;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  line-height: 70px;
  font-weight: bold;
  font-size: 2em;
  text-align: center;
  background-color: #9ddad8;
  display: inline-block;
}
</style>
