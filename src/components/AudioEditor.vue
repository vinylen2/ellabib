<template>
  <div class="editor">
    <div class="menu">
      <button class="button"
        v-if="!isPlaying"
        @click="play"><icon name="play" scale="2"></icon>
      </button>
      <button class="button"
        v-if="isPlaying"
        @click="pause"><icon name="pause" scale="2"></icon>
      </button>
      <div class="time"
        v-show="isEditing">
        {{roundedTime}}
      </div>
      <button class="button"
        @click="cutBlob"><icon name="scissors" scale="2"></icon>
      </button>
      <button class="button"
        v-if="history.length > 0"
        @click="undoSlice"><icon name="undo" scale="2"></icon>
      </button>
      <button class="button"
        @click="trashRecording"><icon name="trash-o" scale="2"></icon>
      </button>
    </div>
    <div class="waveform"
      :id="waveformId"
      @click="setTime">
    </div>
  </div>
</template>


<script>
import WaveSurfer from 'wavesurfer.js';
import audioBufferSlice from 'audiobuffer-slice';
import toWav from 'audiobuffer-to-wav';
import Icon from 'vue-awesome';
// eslint-disable-next-line no-use-before-define
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';

export default {
  name: 'audio-editor',
  components: {
    Icon,
  },
  data() {
    return {
      wavesurfer: null,
      history: [],
      time: {
        selected: 0,
        length: '',
      },
      isPlaying: false,
    };
  },
  props: {
    dataUrl: '',
    source: '',
    isEditing: false,
  },
  computed: {
    roundedTime() {
      return this.time.selected.toFixed(1);
    },
    waveformId() {
      return `waveform-${this.source}`;
    },
  },
  watch: {
    dataUrl() {
      this.resetWavesurfer();
    },
  },
  created() {
    this.$nextTick(() => {
      this.initiateWavesurfer();
    });
  },
  methods: {
    trashRecording() {
      this.$emit('trashRecording');
    },
    resetWavesurfer() {
      this.wavesurfer.destroy();
      this.initiateWavesurfer();
    },
    cutBlob() {
      const { start, end } = this.wavesurfer.regions.list[1];
      this.newSlice(start * 1000, end * 1000);
      this.isEdited = true;
    },
    undoSlice() {
      this.audiobufferToWav(this.history.pop());
    },
    newSlice(start, end) {
      audioBufferSlice(this.wavesurfer.backend.buffer, start, end, (error, sliced) => {
        this.history.push(this.wavesurfer.backend.buffer);
        this.audiobufferToWav(sliced);
        // if (error) {
        // } else {
        //   this.history.push(this.wavesurfer.backend.buffer);
        //   this.audiobufferToWav(sliced);
        // }
      });
    },
    audiobufferToWav(buffer) {
      const wav = toWav(buffer);
      const blob = new Blob([new DataView(wav)], {
        type: 'audio/wav',
      });
      this.$emit('cut', blob, this.source);
    },
    initiateWavesurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: `#${this.waveformId}`,
        waveColor: 'violet',
        plugins: [
          RegionsPlugin.create({
            enableDragSelection: false,
          }),
        ],
      });
      this.wavesurfer.load(this.dataUrl);
      this.wavesurfer.on('ready', () => {
        const duration = this.wavesurfer.getDuration();
        this.wavesurfer.addRegion({
          id: 1,
          start: duration * 0.05,
          end: duration * 0.95,
          resize: true,
          drag: false,
          color: 'rgba(0, 0, 0, 0.3)',
        });
      });
    },
    play() {
      if (this.isEditing) {
        this.wavesurfer.playPause();
        this.isPlaying = true;
        this.interval = setInterval(() => {
          const time = parseFloat((this.wavesurfer.getCurrentTime()));
          this.$set(this.time, 'selected', time);
        }, 100);
      }
    },
    pause() {
      if (this.isEditing) {
        this.wavesurfer.pause();
        this.isPlaying = false;
        clearInterval(this.interval);
      }
    },
    setTime() {
      this.$nextTick(() => {
        const time = parseFloat((this.wavesurfer.getCurrentTime()));
        this.$set(this.time, 'selected', time);
      });
    },
  },
};

</script>

<style>

.waveform .wavesurfer-handle {
  background-color: grey;
  width: 15%;
  max-width: 50px;
}

.button {
  border:none;
  padding: 0;
  font-weight: bold;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: #9ddad8;
  text-align: center;
  cursor: pointer;
}

.time {
  margin: 10px;
  font-weight: bold;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: #9ddad8;
  text-align: center;
  display: inline-block;
  font-size: 2em;
  line-height: 70px;
}


.editor {
  font-size: 0.8em;
}

.waveform {
  display:block;
}

</style>
