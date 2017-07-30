<template>
  <div class="container">
    <div :id="waveformId"
      @click="setTime">
    </div>
    <div class="button"
      v-if="!isPlaying"
      @click="play"
      v-html="unicodeIcons.play">
    </div>
    <div class="button"
      v-if="isPlaying"
      @click="pause">P
    </div>
    <div class="button edit"
      v-html="unicodeIcons.edit"
      @click="cutBlob">
    </div>
    <div class="button"
      v-show="isEditing">
      {{roundedTime}}
    </div>
  </div>
</template>


<script>
import Store from '@/stores/store';
import WaveSurfer from 'wavesurfer.js';

export default {
  name: 'audio-editor',
  data() {
    return {
      dataUrl: '',
      time: {
        selected: 0,
        length: '',
      },
      isPlaying: false,
      unicodeIcons: {
        edit: '&#x2702;',
        play: '&#9658;',
      },
    };
  },
  props: {
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
  created() {
    setTimeout(() => {
      window.wavesurfer = WaveSurfer.create({
        container: `#${this.waveformId}`,
        waveColor: 'violet',
      });
      window.wavesurfer.load(this.dataUrl);
    });
    this.dataUrl = Store.audio[this.source].dataUrl;
  },
  methods: {
    cutBlob() {
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
    saveToStore(blob, timerLength) {
      Store.saveData(this.source, blob, timerLength);
    },
  },
};

</script>

<style scoped>
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
}
</style>
