<script>
  import VueHowler from 'vue-howler';

  export default {
    mixins: [VueHowler],
    data() {
      return {
        divs: {
          play: '&#9658;',
          pause: '&nbsp;&#9612&#9612',
          reset: '&#8634;',
        },
      };
    },
    methods: {
      reset() {
        this.setSeek(0);
        this.play();
      },
    },
  };
</script>

<template>
  <div>
    <div class="button pause" v-if="playing" @click="togglePlayback" v-html="divs.pause"></div>
    <div class="button" v-else @click="togglePlayback" v-html="divs.play"></div>
    <div class="button" @click="reset" v-html="divs.reset"></div>
  </div>
</template>

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

.pause {
  font-size: 2em;
}
</style>
