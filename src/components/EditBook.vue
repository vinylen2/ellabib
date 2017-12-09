<template>
  <div class="wrapper"
    @keyup.enter="editBook">
    <h3>Redigera bok</h3>
    <form class="manual post flex-container"
      id="edit-book">
      <div class="flex-left">
        Titel
      </div>
      <div class="flex-right">
        <input v-model="local.title"
          :class="{'has-error': errors.has('title') }"
          name="title"
          placeholder="Titel">
      </div>
      <div class="flex-left">
        Sidor
      </div>
      <div class="flex-right">
        <input v-model="local.pages"
          :class="{'has-error': errors.has('isbn') }"
          name="pages"
          placeholder="Antal sidor">
      </div>
      <div class="flex-left">
        Genre
      </div>
      <div class="flex-right">
        <v-select class="select-style"
          :max-height="'150px'"
          :transition="'none'"
          :value="genre"
          v-model="local.genre"
          :options="$store.state.genres"
          label="name">
        </v-select>
      </div>
      <div class="flex-left">
        Författare
      </div>
      <div class="flex-right">
        <v-select class="select-style"
          :max-height="'100px'"
          :transition="'none'"
          :value="author"
          v-model="local.author"
          :options="authors"
          label="fullName">
        </v-select>
      </div>
    </form>
    <div class="menu"
      v-if="loading">
      <sync-loader class="sync-loader"
        :color="'#71c5e8'">
      </sync-loader>
    </div>
    <div class="menu"
      v-else>
      <button class="button float add"
        @click="editBook">Spara
      </button>
      <button class="button float close"
        @click="leaveModal">Stäng
      </button>
    </div>
  </div>
</template>

<script>
import Books from '@/api/services/books';
import Authors from '@/api/services/authors';
import vSelect from 'vue-select';
import SyncLoader from 'vue-spinner/src/SyncLoader';


export default {
  name: 'edit-book',
  components: {
    vSelect,
    SyncLoader,
  },
  props: [
    'bookId',
    'author',
    'genre',
    'title',
    'pages',
  ],
  data() {
    return {
      loading: false,
      authors: [],
      local: {
        author: this.author,
        genre: this.genre,
        title: this.title,
        pages: this.pages,
      },
    };
  },
  created() {
    this.getAuthors();
    window.addEventListener('keyup', (event) => {
      if (event.which === 13) {
        this.editBook();
      }
    });
  },
  methods: {
    leaveModal() {
      this.$emit('leaveModal', false);
    },
    editBook() {
      this.loading = true;
      Books.edit({
        bookId: this.bookId,
        authorId: this.local.author.id,
        genreId: this.local.genre.id,
        title: this.local.title,
        pages: this.local.pages,
      })
      .then(() => {
        setTimeout(() => {
          this.$emit('leaveModal', {
            author: this.local.author,
            genre: this.local.genre,
            title: this.local.title,
            pages: this.local.pages,
          });
        }, 200);
      });
    },
    getAuthors() {
      Authors.getAll()
        .then((result) => {
          this.authors = result.data;
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

.close {
  background-color: #ff585d;
}

.add {
  background-color: #71c5e8;
}
.float {
  float: left;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.flex-left {
  width: 15%;
  margin-bottom: 5px;
  margin-left: 12%;
  font-weight: bold;
  text-align:left;
  line-height: 34px;
}

.flex-right {
  width: 48%;
  margin-bottom: 5px;
  text-align: left;
}

.flex-box{
  width: 100%;
  align-items:center;
}

h3 {
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
  margin: 20px 0;
}

.select-style {
  width: 356px;
}

input {
  padding-left: 5px;
  font-size: 15px;
  height: 34px;
  width: 350px;
}

.flex-box button {
  margin: 10px 0;
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
