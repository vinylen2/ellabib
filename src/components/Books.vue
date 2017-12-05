<template>
  <div class="container">
    <div class="loading"
      v-if="$store.state.genres.length == 0">
      <sync-loader :color="'#71c5e8'"></sync-loader>
    </div>
    <div class="genre-search" v-else>
      <a v-for="genre in $store.state.genres" class="genre tooltip"
        v-tooltip.bottom="genre.name">
        <img class="genre-icon"
          @click="toggleSelected(genre); gaGenre(genre);"
          v-bind:class="{ selected: selected == genre }"
          :src="`${imagesUrl}${genre.slug}.png`"/>
      </a>
      <a class="genre button"
        @click="toggleSearch"><icon name="search" scale="2"></icon>
      </a>
    </div>
    <transition name="fadeLeft">
      <div class="searchbar"
        v-if="displaySearch">
        <input class="searchform"
          type="text"
          placeholder="Sök efter titel/författare..."
          v-model="searchTerm">
      </div>
    </transition>
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
    <mugen-scroll :handler="incrementPage"
      v-if="!allBooksFetched"
      :should-handle="!loading">
      <sync-loader :color="'#71c5e8'"></sync-loader>
    </mugen-scroll>
  </div>
</template>

<script>
/* eslint no-param-reassign: ["error", { "props": false }]*/
import Vue from 'vue';
import { VTooltip } from 'v-tooltip';
import MugenScroll from 'vue-mugen-scroll';
import Books from '@/api/services/books';
import Genres from '@/api/services/genres';
import Icon from 'vue-awesome';
import SyncLoader from 'vue-spinner/src/SyncLoader';
import _ from 'lodash';
import Urls from '@/assets/urls';

Vue.directive('tooltip', VTooltip);

require('vue2-animate/dist/vue2-animate.min.css');

export default {
  name: 'books',
  metaInfo: {
    title: 'Alla böcker',
  },
  components: {
    MugenScroll,
    Icon,
    SyncLoader,
  },
  props: [
    'genre',
    'forceSearch',
  ],
  data() {
    return {
      searchTerm: '',
      displaySearch: false,
      selected: '',
      imagesUrl: Urls.images,
      busy: false,
      image: '',
      genres: [],
      queryParams: { genre: [] },
      page: 1,
      booksToDisplay: 10,
      loading: false,
    };
  },
  computed: {
    paginatedBooks() {
      return this.$store.state.books.slice(0, this.page * this.booksToDisplay);
    },
    allBooksFetched() {
      if (this.$store.state.books.length === this.paginatedBooks.length) {
        return true;
      }
      return false;
    },
  },
  watch: {
    searchTerm: _.debounce(function () {
      this.searchBooks();
    }, 500),
  },
  created() {
    this.getGenres();
    if (this.$route.params.genre) {
      this.addGenreToQuery(this.$route.params.genre);
    } else if (this.$route.params.forceSearch) {
      this.displaySearch = true;
      this.searchTerm = this.$route.params.forceSearch;
      this.searchBooks();
    } else {
      this.getBooks();
    }
  },
  methods: {
    gaGenre(genre) {
      this.$ga.event({
        eventCategory: 'Leta böcker',
        eventAction: 'Genre',
        eventLabel: genre.name,
      });
    },
    gaSearch(term) {
      this.$ga.event({
        eventCategory: 'Leta böcker',
        eventAction: 'Sökning',
        eventLabel: term,
      });
    },
    incrementPage() {
      this.loading = true;
      this.page += 1;
      this.loading = false;
    },
    toggleSearch() {
      this.displaySearch = !this.displaySearch;
      this.searchTerm = '';
    },
    addGenreToQuery(genre) {
      if (this.queryParams.genre[0] === genre.slug) {
        this.getBooks();
        this.queryParams.genre.pop();
      } else {
        this.queryParams.genre[0] = genre.slug;
        this.searchBooks();
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
    searchBooks() {
      if (this.queryParams.genre.length > 0) {
        Books.searchFromGenre(this.queryParams.genre, this.searchTerm)
          .then((result) => {
            this.$store.commit('books', result.data);
          });
      } else {
        this.gaSearch(this.searchTerm);
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
          this.$store.commit('genres', result.data);
          if (this.$route.params.genre) {
            this.$store.state.genres.forEach((genre) => {
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

<style>
.loading {
  margin: 50px;
}
.tooltip .tooltip-inner {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: #71c5e8;
  padding: 5px 10px;
  border-radius: 20px;
}

</style>

<style scoped>
.wrapper {
  transition: all 0.5s ease-in-out;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #2c3e50;
}
::-moz-placeholder { /* Firefox 19+ */
  color: #2c3e50;
}
:-ms-input-placeholder { /* IE 10+ */
  color: #2c3e50;
}
:-moz-placeholder { /* Firefox 18- */
  color: #2c3e50;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.searchform {
  border-radius: 10px;
  width: 80%;
  height: 30px;
  background-color: #71c5e8;
  color: #2c3e50;
  border:none;
  font-size: 1.5em;
  padding: 15px;
}

.searchbar {
  margin-top: 10px;
  margin-bottom: 20px;
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
  margin: 20px 0;
}

.button  {
  vertical-align: top;
  margin-top: 3px;
  margin-right:5px;
  font-weight: bold;
  font-size: 3em;
  width: 63px;
  height: 63px;
  line-height: 63px;
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
    .searchform {
      width: 40%;
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
