<template>
  <div class="container flex-box">
    <div class="button"
      v-if="!isPlaying"
      @click="play"
      v-html="unicodeIcons.play">
    </div>
    <div class="button"
      v-if="isPlaying"
      @click="pause">P
    </div>
    <div class="button"
      v-show="isEditing">
      {{roundedTime}}
    </div>
    <div class="button edit"
      v-html="unicodeIcons.edit"
      @click="cutBlob">
    </div>
    <div class="button undo"
      v-if="history.length > 0"
      v-html="unicodeIcons.undo"
      @click="undoSlice">
    </div>
    <div :id="waveformId"
      @click="setTime">
    </div>
  </div>
</template>


<script>
import WaveSurfer from 'wavesurfer.js';
import audioBufferSlice from 'audiobuffer-slice';
import toWav from 'audiobuffer-to-wav';
// eslint-disable-next-line no-use-before-define
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';

export default {
  name: 'audio-editor',
  data() {
    return {
      cutCount: 0,
      history: [],
      localBlob: this.blob,
      localDataUrl: this.dataUrl,
      isEdited: false,
      audioCtx: '',
      audioSource: '',
      time: {
        selected: 0,
        length: '',
      },
      isPlaying: false,
      unicodeIcons: {
        edit: '&#x2702;',
        play: '&#9658;',
        undo: '&#8634;',
      },
    };
  },
  props: {
    blob: '',
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
    setTimeout(() => {
      this.initiateWavesurfer();
    });
    // this.setDataFromStore();
  },
  methods: {
    resetWavesurfer() {
      window.wavesurfer.destroy();
      this.initiateWavesurfer();
    },
    cutBlob() {
      const { start, end } = window.wavesurfer.regions.list[1];
      this.newSlice(start * 1000, end * 1000);
      this.isEdited = true;
    },
    undoSlice() {
      this.cutCount -= 1;
      this.audiobufferToWav(this.history.pop());
    },
    newSlice(start, end) {
      audioBufferSlice(window.wavesurfer.backend.buffer, start, end, (error, sliced) => {
        if (error) {
          console.log(error);
        } else {
          this.history.push(window.wavesurfer.backend.buffer);
          this.cutCount += 1;
          this.audiobufferToWav(sliced);
        }
      });
    },
    audiobufferToWav(buffer) {
      const wav = toWav(buffer);
      const blob = new window.Blob([new DataView(wav)], {
        type: 'audio/wav',
      });
      this.$emit('cut', blob);
    },
    initiateWavesurfer() {
      window.wavesurfer = WaveSurfer.create({
        container: `#${this.waveformId}`,
        waveColor: 'violet',
        plugins: [
          RegionsPlugin.create({
            enableDragSelection: false,
          }),
        ],
      });
      window.wavesurfer.load(this.dataUrl);
      window.wavesurfer.on('ready', () => {
        window.wavesurfer.addRegion({
          id: 1,
          start: 0.2,
          end: 1.0,
          resize: true,
          drag: false,
          color: 'rgba(0, 0, 0, 0)',
        });
      });
    },
    play() {
      if (this.isEditing) {
        window.wavesurfer.playPause();
        this.isPlaying = true;
        this.interval = window.setInterval(() => {
          const time = parseFloat((window.wavesurfer.getCurrentTime()));
          this.$set(this.time, 'selected', time);
        }, 100);
      }
    },
    pause() {
      if (this.isEditing) {
        window.wavesurfer.pause();
        this.isPlaying = false;
        window.clearInterval(this.interval);
      }
    },
    setTime() {
      setTimeout(() => {
        const time = parseFloat((window.wavesurfer.getCurrentTime()));
        this.$set(this.time, 'selected', time);
      }, 5);
    },
  },
};

</script>

<style>
.button {
  margin: 10px;
  font-weight: bold;
  font-size: 2em;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: #9ddad8;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
}

.wavesurfer-handle {
  background-color: black;
  max-width: 10px;
}
</style>
