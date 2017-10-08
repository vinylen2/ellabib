<template>
  <div class="editor">
    <div class="menu">
      <div class="button"
        v-if="!isPlaying"
        @click="play"
        v-html="unicodeIcons.play">
      </div>
      <div class="button"
        v-if="isPlaying"
        @click="pause">P
      </div>
      <div class="button time"
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

<style scoped>

.button {
  margin: 10px;
  font-weight: bold;
  font-size: 2em;
  line-height: 70px;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: #9ddad8;
  text-align: center;
  display: inline-block;
}

.time {
  font-size: 2em;
}
.wavesurfer-handle {
  background-color: grey;
  width: 10%;
  max-width: 50px;
}

.editor {
  font-size: 0.8em;
}

.waveform {
  display:block;
}

</style>
