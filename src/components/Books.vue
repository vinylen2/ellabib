<template>
  <div class="container">
    <div class="genre-search">
      <a v-for="genre in genres" class="genre">
        <img class="genre-icon" 
          v-on:click="toggleSelected(genre)"
          v-bind:class="{ selected: selected == genre }"
          :src="`${imagesUrl}${genre.slug}.png`"/>
      </a>
      <a class="genre button"
        @click="toggleSearch">
      </a>
    </div>
    <div class="searchbar"
      v-if="displaySearch">
      <input type="text" 
        class="searchform"
        v-model="searchTerm">
    </div>
    <div class="wrapper flex-container">
      <div v-for="book in paginatedBooks" 
        class="book">
        <router-link class ="link" :to="{ name: 'bok', params: { slug: book.slug }}">
          <img class="front-img"
            v-if="book.localImage"
            :src="`${imagesUrl}${book.imageUrl}`">
          <img class="front-img"
            v-if="!book.localImage"
            :src="book.imageUrl">
          <h3>{{ book.title }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint no-param-reassign: ["error", { "props": false }]*/
import Books from '@/api/services/books';
import Genres from '@/api/services/genres';
import Urls from '@/assets/urls';

export default {
  name: 'books',
  props: ['genre'],
  data() {
    return {
      displaySearch: false,
      selected: '',
      imagesUrl: Urls.images,
      busy: false,
      image: '',
      genres: [],
      queryParams: { genre: [] },
      page: 1,
      booksToDisplay: 10,
      searchTerm: '',
    };
  },
  computed: {
    paginatedBooks() {
      return this.$store.state.books.slice(0, this.page * this.booksToDisplay);
    },
  },
  watch: {
    searchTerm() {
      this.searchBooks();
    },
  },
  created() {
    this.getGenres();
    if (this.$route.params.genre) {
      this.addGenreToQuery(this.$route.params.genre);
    } else {
      this.getBooks();
    }
  },
  methods: {
    toggleSearch() {
      this.displaySearch = !this.displaySearch;
    },
    addGenreToQuery(genre) {
      if (this.queryParams.genre[0] === genre.slug) {
        this.getBooks();
        this.queryParams.genre.pop();
      } else {
        this.queryParams.genre[0] = genre.slug;
        this.getBooksFromGenres();
      }
    },
    toggleSelected(genre) {
      if (this.selected === genre) {
        this.selected = '';
      } else {
        this.selected = genre;
      }
      this.addGenreToQuery(genre);
    },
    getBooksFromGenres() {
      Books.search(this.$data.queryParams.genre.join(' '))
        .then((result) => {
          this.$store.commit('books', result.data);
        });
    },
    searchBooks() {
      if (this.queryParams.genre.length > 0) {
        console.log(this.queryParams.genre);
        Books.searchFromGenre(this.queryParams.genre, this.searchTerm)
          .then((result) => {
            this.$store.commit('books', result.data);
          });
      } else {
        Books.search(this.searchTerm)
          .then((result) => {
            this.$store.commit('books', result.data);
          });
      }
    },
    getBooks() {
      Books.getAll()
        .then((result) => {
          this.$store.commit('books', result.data);
        });
    },
    getGenres() {
      Genres.getAll()
        .then((result) => {
          this.genres = result.data;
          if (this.$route.params.genre) {
            this.genres.forEach((genre) => {
              if (genre.id === this.$route.params.genre.id) {
                this.selected = genre;
              }
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.book {
    padding: 10px;
    box-sizing: border-box;
    flex: 0 0 48%;
    margin: 0 1% 10px;
}


.genre-search {
  display: inline-block;
  text-align: center;
  margin: 20px 0 20px 0;
}

.button  {
  margin-right:5px;
  font-weight: bold;
  font-size: 1.5em;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 100%;
  background-color: #9ddad8;
  text-align: center;
  cursor: pointer;
}

.genre {
  display: inline-block;
}

h3 {
  font-size: 1.5em;
  margin-top: 10px;
}

.link {
  text-decoration: none;
  color: #2c3e50;
}

.link:visited {
  color: #2c3e50;
}

.link:hover {
  color: black;
  text-decoration: none;
}

.genre-icon {
  border-radius: 100%;
  border: 3px solid transparent;
  width: 60px;
  cursor: pointer;
}

.front-img {
  width: 250px;
}

img.selected {
  border-color: #002d72;
}

@media (min-width: 700px) {
    .book {
      flex: 0 0 20%;
    }
    .front-img {
      width: 200px;
    }
}
@media (min-width: 980px) {
    .book {
      flex: 0 0 23.0%;
    }
    .front-img {
      width: 200px;
    }
}

@media (min-width: 1400px) {
    .book {
      flex: 0 0 18.0%;
    }
    .front-img {
      width: 200px;
    }
}
</style>
