<template>
  <div class="postbook-container">
    <div class="genre-search">
      <div v-for="genre in genres" class="genre">
        <img class="genre-icon" 
          v-on:click="toggleselectedGenre(genre)"
          v-bind:class="{ selectedGenre: selectedGenre == genre }"
          :src="`${imagesUrl}${genre.slug}.png`"/>
      </div>
    </div>
    <div class="menu">
      <div class="button"
        v-if="cordova.isApp"
        @click="barcodeScanner">Scanna
      </div>
      <div class="button"
        @click="toggleManualIsbn">Ange ISBN
      </div>
      <div class="button"
        @click="toggleManualPost">Mata in...
      </div>
    </div>
    <div class="manual-isbn"
      v-if="manualIsbn">
      <input v-model="isbn"
        placeholder="ISBN">
      <div class="button"
        @click="postIsbn">Lägg till
      </div>
    </div>
    <div class="manual-post"
      v-if="manualPost">
      <input v-model="isbn"
        placeholder="ISBN">
      <input v-model="manualData.title"
        placeholder="Titel">
      <input v-model="manualData.pages"
        placeholder="Antal sidor">
      <select v-model="authorId"
        name="Författare">
        <option v-for="author in authors" class="authors"
          :selected="authorId == author.id ? true : false"
          :value="`${author.id}`">{{author.fullName}}
        </option>
      </select>
      <button v-if="authorSelect"
        @click="toggleAuthorSelect">Lägg till ny författare
      </button>
      <div class="add author"
        v-if="!authorSelect">
        <input v-model="newAuthor.firstname"
          placeholder="Förnamn">
        <input v-model="newAuthor.lastname"
          placeholder="Efternamn">
        <button
          @click="addAuthor">Lägg till ny författare
        </button>
      </div>
      <div class="button"
        @click="postManual">Lägg till
      </div>
    </div>
  </div>
</template>


<script>
import Books from '@/api/services/books';
import Genres from '@/api/services/genres';
import Authors from '@/api/services/authors';
import Urls from '@/assets/urls';
import Store from '@/stores/store';
// import Urls from '@/assets/urls';

export default {
  name: 'post-book',
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
      genres: [],
      authors: [],
      manualData: {
        title: '',
        pages: '',
      },
      manualIsbn: false,
      manualPost: false,
      posted: false,
      imagesUrl: Urls.images,
      isAdmin: Store.isAdmin,
      cordova: {
        isApp: Store.cordova.isApp,
        isActive: Store.cordova.isActive,
      },
    };
  },
  computed: {
    genreId() {
      return this.selectedGenre.id;
    },
  },
  created() {
    this.$nextTick(() => {
      this.getGenres();
    });
  },
  methods: {
    addAuthor() {
      this.postAuthor(this.newAuthor.firstname, this.newAuthor.lastname);
    },
    toggleAuthorSelect() {
      this.authorSelect = !this.authorSelect;
    },
    toggleManualPost() {
      this.getAuthors();
      this.manualPost = !this.manualPost;
    },
    toggleManualIsbn() {
      this.manualIsbn = !this.manualIsbn;
    },
    toggleselectedGenre(genre) {
      if (this.selectedGenre === genre) {
        this.selectedGenre = '';
      } else {
        this.selectedGenre = genre;
      }
    },
    postManual() {
      this.publishBookFromManualInput(
        this.isbn,
        this.genreId,
        this.manualData.title,
        this.manualData.pages,
        this.authorId,
        'nopicture.png',
      );
    },
    postIsbn() {
      this.publishBookFromIsbn(this.isbn, this.genreId);
    },
    barcodeScanner() {
      window.cordova.plugins.barcodeScanner.scan((result) => {
        this.isbn = result.text;
        this.publishBookFromIsbn(result.text, this.genreId).then(() => {
          console.log('posted');
        });
      }, (error) => {
        alert(`Scanning failed: ${error}`);
      });
    },
    publishBookFromIsbn(isbn, genreId) {
      Books.publishBookFromIsbn(isbn, genreId)
        .then((result) => {
          this.posted = true;
          console.log(result);
        });
    },
    publishBookFromManualInput(isbn, genreId, title, pages, authorId, imageUrl) {
      Books.publishBookFromManualInput(isbn, genreId, title, pages, authorId, imageUrl)
        .then((result) => {
          this.posted = true;
          console.log(result);
        });
    },
    postAuthor(firstname, lastname) {
      Authors.create(firstname, lastname)
        .then((result) => {
          this.authors.push(result.data);
          this.authorId = result.data.id;
          this.authorSelect = true;
        });
    },
    getGenres() {
      Genres.getAll()
        .then((result) => {
          this.genres = result.data;
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
.button {
  padding: 0 5px;
  width: 150px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #71c5e8;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
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

</style>
