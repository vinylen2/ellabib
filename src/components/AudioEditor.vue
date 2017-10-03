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
      wavesurfer: null,
      history: [],
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
        if (error) {
          console.log(error);
        } else {
          this.history.push(this.wavesurfer.backend.buffer);
          this.audiobufferToWav(sliced);
        }
      });
    },
    audiobufferToWav(buffer) {
      const wav = toWav(buffer);
      const blob = new Blob([new DataView(wav)], {
        type: 'audio/wav',
      });
      this.$emit('cut', blob);
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
        this.wavesurfer.addRegion({
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
