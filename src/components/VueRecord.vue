<template>
  <div class="audio-recorder">
    <div class="button stop"
      v-show="isRecording"
      @click="stopRecording"
      v-html="unicodeIcons.stop">
    </div>
    <div class="button record"
      v-show="!isRecording"
      @click="startRecording"
      v-html="unicodeIcons.record">
    </div>
    <div class="button counter"
      v-show="isRecording">
      {{recordingLength}}
    </div>
    <!-- <div class="button play"
      v-if="dataUrl().length > 0"
      @click="playbackAudio"
      v-html="unicodeIcons.play">
    </div> -->
    <audio-editor class="editor"
      v-if="dataUrl().length > 0"
      v-bind:source="source"
      v-bind:isEditing="isEditing">
    </audio-editor>
  </div>
</template>

<script>
/* eslint-disable */
import RecordRTC from 'recordrtc';
import Store from '@/stores/store';
import timer from 'minimal-timer';
import AudioEditor from '@/components/AudioEditor';

export default {
  components: {
    'audio-editor': AudioEditor,
  },
  props: {
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
      Timer: timer(),
      recordingLength: '',
      isRecording: false,
      isEditing: false,
      unicodeIcons: {
        play: '&#9658;',
        record: '&#9679;',
        stop: '&#9632;',
        edit: '&#x2702;',
      }
    }
  },
  methods: {
    startTimer() {
      this.Timer.start();
      this.recordingLength = 0;
      this.interval = window.setInterval(() => {
        const time = this.Timer.elapsedTime();
        console.log(time);
        this.recordingLength = (time / 1000).toFixed(1);
      }, 500);
    },
    stopTimer(blob) {
      this.saveToStore(blob, this.Timer.stop());
      window.clearInterval(this.interval);
      this.isEditing = true;
    },
    dataUrl() {
      return Store.getDataUrl(this.source);
    },
    recordingLength() {
      return Store.getRecordingLength(this.source);
    },
    saveToStore(blob, timerLength) {
      Store.saveData(this.source, blob, timerLength);
    },
    captureUserMedia(mediaConstraints, successCallback, errorCallback) {
      var isBlackBerry = !!(/BB10|BlackBerry/i.test(navigator.userAgent || ''));
      if(isBlackBerry && !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)) {
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
      this.saveToStore('');
    },
  },
  destroyed() {
    this.stopRecording()
  }
}

</script>

<style scoped>
.button {
  margin: 10px;
  font-weight: bold;
  font-size: 3em;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: #9ddad8;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}

.counter {
  font-size: 2em;
}

.record {
  font-size: 4em;
  color: #ff585d;
}
</style>
