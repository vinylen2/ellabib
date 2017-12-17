<template>
  <div>
    <div class="book"
      v-if="admin">
      <button class="admin-button pause"
        v-if="playing"
        @click="togglePlayback"><icon name="pause" scale="1"></icon>
      </button>
      <button class="admin-button"
        v-else
        @click="togglePlayback"><icon name="play" scale="1"></icon>
      </button>
      <button class="admin-button"
        @click="reset"><icon name="fast-backward" scale="1"></icon>
      </button>
    </div>
    <div class="admin"
      v-else>
      <button class="button pause"
        v-if="playing"
        @click="togglePlayback"><icon name="pause" scale="2"></icon>
      </button>
      <button class="button"
        v-else
        @click="togglePlayback();"><icon name="play" scale="2"></icon>
      </button>
      <button class="button"
        @click="reset();"><icon name="fast-backward" scale="2"></icon>
      </button>
    </div>
  </div>
</template>

<script>
import VueHowler from 'vue-howler';
import Reviews from '@/api/services/reviews';
import Icon from 'vue-awesome';

export default {
  mixins: [VueHowler],
  components: {
    Icon,
  },
  props: [
    'audioInfo',
    'admin',
  ],
  data() {
    return {
      played: false,
      book: {
        title: this.audioInfo.book.title,
        id: this.audioInfo.book.id,
      },
      type: this.audioInfo.type,
      audioId: this.audioInfo.id,
    };
  },
  computed: {
    playDuration() {
      return this.seek / this.duration;
    },
    gaCategory() {
      if (this.type === 'review') {
        return 'Recension';
      }
      return 'Beskrivning';
    },
  },
  watch: {
    playDuration() {
      if (this.something > 0.3 && !this.played && !this.admin) {
        this.gaPlay();
        this.incrementCounter();
        this.played = true;
      }
    },
  },
  methods: {
    gaPlay() {
      this.$ga.event({
        eventCategory: 'Ljud',
        eventAction: this.book.title,
        eventLabel: this.gaCategory,
      });
    },
    incrementCounter() {
      Reviews.incrementPlay({
        reviewId: this.audioId,
        type: this.type,
      });
    },
    reset() {
      this.setSeek(0);
      this.played = false;
      this.play();
    },
  },
};
</script>

<style scoped>

.button:hover {
  background-color: #71c5e8;
}

.button {
  border: none;
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

.admin-button {
  border: none;
  margin-right:5px;
  font-weight: bold;
  width: 30px;
  height: 30px;
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

</style>
