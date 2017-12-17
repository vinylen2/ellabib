<template>
  <div class="wrapper">
    <h3>Redigera {{formattedType}}</h3>
    <div>
      <textarea class="publish-textarea review"
        v-model="local.text">
      </textarea>

    </div>
    <div class="menu"
      v-if="loading">
      <sync-loader class="sync-loader"
        :color="'#71c5e8'">
      </sync-loader>
    </div>
    <div class="menu"
      v-else>
      <button class="button float add"
        @click="editText">Spara
      </button>
      <button class="button float close"
        @click="closeTextModal">Stäng
      </button>
    </div>
  </div>
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader';
import Reviews from '@/api/services/reviews';

export default {
  name: 'edit-review-text',
  components: {
    SyncLoader,
  },
  props: [
    'reviewId',
    'type',
    'text',
  ],
  data() {
    return {
      loading: false,
      local: {
        text: this.text,
      },
    };
  },
  created() {
    // window.addEventListener('keyup', (event) => {
    //   if (event.which === 13) {
    //     this.editText();
    //   }
    // });
  },
  computed: {
    formattedType() {
      if (this.type === 'description') {
        return 'beskrivning';
      }
      return 'recension';
    },
  },
  methods: {
    closeTextModal() {
      this.$emit('closeTextModal', false);
    },
    editText() {
      this.loading = true;
      Reviews.updateText({
        reviewId: this.reviewId,
        type: this.type,
        text: this.local.text,
      })
      .then(() => {
        setTimeout(() => {
          this.$emit('closeTextModal', {
            reviewId: this.reviewId,
            type: this.type,
            text: this.local.text,
          });
        }, 200);
      });
    },
  },
};

</script>

<style scoped>
.wrapper {
  text-align: center;
}

.button {
  margin: 10px 10px;
  padding: 0 5px;
  width: 150px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #c98bdb;
  border-radius: 15px;
  border:none;
  text-align: center;
  cursor: pointer;
}

.publish-textarea {
  align-items: center;
  display: inline-block;
  width: 80%;
  height: 200px;
  resize: none;
  outline: none;
  font-size: 1em;
  border-color: #c2c7c9;
}

.close {
  background-color: #ff585d;
}

.add {
  background-color: #71c5e8;
}
h3 {
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
  margin: 20px 0;
}

.menu {
  display: inline-block;
  margin: 0 auto;
  margin-top: 15px;
}

.sync-loader {
  margin-top: 15px;
}

</style>
