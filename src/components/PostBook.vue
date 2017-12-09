<template>
  <div class="postbook-container">
    <div class="genre-search">
      <div v-for="genre in $store.state.genres" class="genre">
        <img class="genre-icon"
          v-on:click="toggleselectedGenre(genre)"
          v-bind:class="{ selectedGenre: selectedGenre == genre }"
          :src="`${imagesUrl}${genre.slug}.png`"/>
      </div>
    </div>
    <div class="menu">
      <div class="button float"
        v-if="isCordovaApp"
        @click="barcodeScanner">Scanna
      </div>
      <div class="button float"
        @click="toggleManualIsbn">Ange ISBN
      </div>
      <div class="button float"
        @click="toggleManualPost">Mata in...
      </div>
    </div>
    <form class="manual isbn flex-container"
      @submit.prevent="validateBeforeSubmitManualIsbn"
      v-if="manualIsbn">
        <div class="flex-left">
          Genre
        </div>
        <div class="flex-right">
          <input v-model="selectedGenre.name"
            :class="{'has-error': errors.has('genre') }"
            placeholder="Välj i listan ovan"
            disabled>
          <input v-model="selectedGenre.name"
            v-validate="'required'"
            name="genre"
            type="hidden">
        </div>
        <div class="flex-left">
          ISBN
        </div>
        <div class="flex-right">
          <input v-model="isbn"
            :class="{'has-error': errors.has('isbn') }"
            v-validate="'required'"
            name="isbn"
            placeholder="ISBN">
        </div>
        <div class="flex-box">
          <button class="button add"
            type="submit">Lägg till
          </button>
        </div>
    </form>
    <form class="manual post flex-container"
      @submit.prevent="validateBeforeSubmitManualBook"
      v-if="manualPost">
      <div class="flex-left">
        Genre
      </div>
      <div class="flex-right">
        <input v-model="selectedGenre.name"
          :class="{'has-error': errors.has('genre') }"
          placeholder="Välj i listan ovan"
          disabled>
        <input v-model="selectedGenre.name"
          v-validate="'required'"
          name="genre"
          type="hidden">
      </div>
      <div class="flex-left">
        ISBN
      </div>
      <div class="flex-right">
        <input v-model="isbn"
          :class="{'has-error': errors.has('isbn') }"
          v-validate="'required'"
          name="isbn"
          placeholder="ISBN">
      </div>
      <div class="flex-left">
        Titel
      </div>
      <div class="flex-right">
        <input v-model="manualData.title"
          :class="{'has-error': errors.has('title') }"
          v-validate="'required'"
          name="title"
          placeholder="Titel">
      </div>
      <div class="flex-left">
        Sidor
      </div>
      <div class="flex-right">
        <input v-model="manualData.pages"
          :class="{'has-error': errors.has('pages') }"
          v-validate="'required'"
          name="pages"
          placeholder="Antal sidor">
      </div>
      <div class="flex-left"
        v-if="authorSelect">
        Författare
        <button class="plus"
          @click="addAuthorModal">Ny författare
        </button>
      </div>
      <div class="flex-right"
        v-if="authorSelect">
        <v-select class="select-style"
          :value="authorId"
          :options="authors"
          label="fullName">
        </v-select>
      </div>
      <modal name="add-author"
        :height="250">
        <div class="add-author flex-box">
          <h3>Ny författare</h3>
          <div class="flex-container">
              <div class="flex-left-modal">
                Förnamn
              </div>
              <div class="flex-right">
                <input v-model="newAuthor.firstname"
                  placeholder="Förnamn">
              </div>
              <div class="flex-left-modal">
                Efternamn
              </div>
              <div class="flex-right">
                <input v-model="newAuthor.lastname"
                  placeholder="Efternamn">
              </div>
              <div class="modal-menu">
                <div class="button add"
                  @click="saveAuthor">Spara
                </div>
                <div class="button float close"
                  @click="leaveModal">Stäng
                </div>
              </div>
          </div>
        </div>
      </modal>
      <div class="flex-box">
        <button class="button add"
          type="submit">Lägg till
        </button>
      </div>
    </form>
    <div class="published-message"
      v-if="posted">Bok tillagd.
    </div>
    <div class="published-message"
      v-if="error">{{errorMessage}}
    </div>
  </div>
</template>


<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import vSelect from 'vue-select';
import Books from '@/api/services/books';
import Genres from '@/api/services/genres';
import Authors from '@/api/services/authors';
import Urls from '@/assets/urls';
import VModal from 'vue-js-modal';
// import Urls from '@/assets/urls';

Vue.use(VModal);
Vue.use(VeeValidate);

export default {
  name: 'post-book',
  components: {
    vSelect,
  },
  computed: {
    isCordovaApp() {
      return this.$store.state.cordova.isApp;
    },
    isCordovaActive() {
      return this.$store.state.cordova.active;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    genreId() {
      return this.selectedGenre.id;
    },
  },
  data() {
    return {
      selectedGenre: '',
      isbn: '',
      authorSelect: true,
      authorId: '',
      newAuthor: {
        firstname: '',
        lastname: '',
      },
      authors: [],
      manualData: {
        title: '',
        pages: '',
      },
      manualIsbn: false,
      manualPost: false,
      posted: false,
      imagesUrl: Urls.images,
      error: false,
      errorMessage: '',
    };
  },
  created() {
    this.$nextTick(() => {
      if (this.$store.state.genres.length === 0) {
        this.getGenres();
      }
    });
  },
  methods: {
    validateBeforeSubmitManualBook() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.publishBookFromManualInput(
            this.isbn,
            this.genreId,
            this.manualData.title,
            this.manualData.pages,
            this.authorId,
            'nopicture.png',
          );
        }
      });
    },
    validateBeforeSubmitManualIsbn() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.publishBookFromIsbn(this.isbn, this.genreId);
        }
      });
    },
    saveAuthor() {
      this.postAuthor(this.newAuthor.firstname, this.newAuthor.lastname);
    },
    addAuthorModal() {
      this.$modal.show('add-author');
    },
    leaveModal() {
      this.$modal.hide('add-author');
    },
    toggleManualPost() {
      this.getAuthors();
      this.posted = false;
      this.manualData.title = '';
      this.manualData.pages = '';
      this.isbn = '';
      this.manualIsbn = false;
      this.manualPost = !this.manualPost;
    },
    toggleManualIsbn() {
      this.posted = false;
      this.manualPost = false;
      this.manualIsbn = !this.manualIsbn;
    },
    toggleselectedGenre(genre) {
      if (this.selectedGenre === genre) {
        this.selectedGenre = '';
      } else {
        this.selectedGenre = genre;
      }
    },
    bookPosted(book) {
      this.posted = true;
      this.selectedGenre = '';
      this.manualData.title = '';
      this.manualData.pages = '';
      this.manualPost = false;
      this.error = false;
      this.isbn = '';
      this.$validator.reset();
      this.$store.commit('toggleQr', { title: book.data.title, slug: book.data.slug, id: book.data.id });
    },
    barcodeScanner() {
      window.cordova.plugins.barcodeScanner.scan((result) => {
        this.isbn = result.text;
        this.publishBookFromIsbn(result.text, this.genreId).then(() => {
          this.bookPosted();
        });
      }, () => {
        // alert(`Scanning failed: ${error}`);
      });
    },
    publishBookFromIsbn(isbn, genreId) {
      this.posted = false;
      Books.publishBookFromIsbn(isbn, genreId)
        .then((result) => {
          if (!result.added) {
            this.error = true;
            this.errorMessage = result.message;
          } else {
            this.bookPosted(result);
          }
        });
    },
    publishBookFromManualInput(isbn, genreId, title, pages, authorId, imageUrl) {
      Books.publishBookFromManualInput(isbn, genreId, title, pages, authorId, imageUrl)
        .then((result) => {
          this.bookPosted(result);
        });
    },
    postAuthor(firstname, lastname) {
      Authors.create(firstname, lastname)
        .then((result) => {
          this.authors.push(result.data);
          this.authorId = result.data.id;
          this.authorSelect = true;
          this.$modal.hide('add-author');
        });
    },
    getGenres() {
      Genres.getAll()
        .then((result) => {
          this.$store.commit('genres', result.data);
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
.has-error {
  border: 2px solid #ff585d;
}

.button {
  margin: 0 10px;
  margin-bottom: 10px;
  padding: 0 5px;
  width: 150px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #c98bdb;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}

button {
  color: #2c3e50;
  border: none;
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

.menu {
  display: inline-block;
}

.modal-menu {
  margin-left: 25%;
}

.genre-search {
  display: inline-block;
  text-align: center;
  margin: 20px 0 20px 0;
}

.genre-icon {
  border-radius: 100%;
  border: 3px solid transparent;
  width: 60px;
  cursor: pointer;
}

.genre {
  float:left;
}

img.selectedGenre {
  border-color: #002d72;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.flex-left {
  width: 15%;
  margin-bottom: 5px;
  margin-left: 25%;
  font-weight: bold;
  text-align:left;
}
.flex-left-modal {
  width: 15%;
  margin-bottom: 5px;
  margin-left: 15%;
  font-weight: bold;
  text-align:left;
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

h2 {
  text-align: center;
  font-weight: bold;
  margin: 10px 0;
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
  height: 34px;
  width: 350px;
}

.flex-box button {
  margin: 10px 0;
}

.flex-box .button {
  margin: 10px 0;
}

</style>
