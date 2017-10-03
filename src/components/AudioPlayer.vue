<script>
  import VueHowler from 'vue-howler';

  export default {
    mixins: [VueHowler],
    props: ['small'],
    data() {
      return {
        unicodeIcons: {
          play: '►',
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
    <div class="button pause"
      v-if="playing"
      @click="togglePlayback"
      v-html="unicodeIcons.pause">
    </div>
    <div class="button"
      v-else
      @click="togglePlayback"
      v-html="unicodeIcons.play">
    </div>
    <div class="button"
      @click="reset"
      v-html="unicodeIcons.reset">
    </div>
  </div>
</template>

<style scoped>

.button {
  margin-right:5px;
  font-weight: bold;
  font-size: 3em;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: #9ddad8;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
}

.button:hover {
  background-color: #71c5e8;
}

.pause {
  font-size: 2em;
}
</style>
