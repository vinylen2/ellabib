<script>
  import VueHowler from 'vue-howler';

  export default {
    mixins: [VueHowler],
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
    <a class="button-2 pause"
      v-if="playing"
      @click="togglePlayback"
      v-html="unicodeIcons.pause">
    </a>
    <a class="button-2 "
      v-else
      @click="togglePlayback"
      v-html="unicodeIcons.play">
    </a>
    <a class="button-2 "
      @click="reset"
      v-html="unicodeIcons.reset">
    </a>
  </div>
</template>

<style scoped>

.button-2  {
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

.small a {
  width: 40px;
  height: 40px;
  font-size: 1em;
}

.button-2:hover {
  background-color: #71c5e8;
}

.pause {
  font-size: 2em;
}
</style>
