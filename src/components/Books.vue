<template>
  <div class="container">
    <div class="genre-search">
      <div v-for="genre in genres" class="genre">
        <img class="genre-icon" 
          v-on:click="toggleSelected(genre)"
          v-bind:class="{ selected: selected == genre }"
          :src="`${imagesUrl}${genre.slug}.png`"/>
        <!-- <img class="genre-icon selected"
          v-show="genre.selected"
          v-on:click="addGenreToQuery(genre), toggleSelectedProperty(genre)"
          :src="`${imagesUrl}${genre.slug}.png`"/>
        <img class="genre-icon"
          v-show="!genre.selected"
          v-on:click="addGenreToQuery(genre), toggleSelectedProperty(genre)"
          :src="`${imagesUrl}${genre.slug}.png`"/> -->
      </div>
    </div>
    <div class="wrapper flex-container">
      <div v-for="book in books" 
        class="book">
        <router-link class ="link" :to="{ name: 'bok', params: { slug: book.slug }}">
          <img :src="`${imagesUrl}${book.imageUrl}`">
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
      selected: '',
      imagesUrl: Urls.images,
      busy: false,
      books: [],
      image: '',
      genres: [],
      queryParams: { genre: [] },
    };
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
    loadMore() {
      setTimeout(() => {
        console.log('fetching');
        this.busy = true;
        this.getNewBooks()
          .then((result) => {
            const newArray = this.books.concat(result);
            this.books = newArray;
            this.busy = false;
          });
      }, 1000);
    },
    addGenreToQuery(genre) {
      if (this.queryParams.genre[0] === genre.id) {
        this.getBooks();
        this.queryParams.genre.pop();
      } else {
        this.queryParams.genre[0] = genre.id;
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
      Books.getAllFromGenres(this.$data.queryParams.genre.join(','))
        .then((result) => {
          this.books = result.data;
        });
    },
    getBooks() {
      Books.getAll()
        .then((result) => {
          this.books = result.data;
        });
    },
    getNewBooks() {
      return new Promise((res) => {
        Books.getAll()
          .then((result) => {
            res(result.data);
          });
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
}

.book {
    padding: 10px;
    box-sizing: border-box;
    flex: 0 0 98%;
    margin: 0 1% 10px;
}
@media (min-width: 500px) {
    .book {
      flex: 0 0 48.0%;
    }
}
@media (min-width: 700px) {
    .book {
      flex: 0 0 31.3333333333333%;
    }
}
@media (min-width: 980px) {
    .book {
      flex: 0 0 23.0%;
    }
}

@media (min-width: 1400px) {
    .book {
      flex: 0 0 18.0%;
    }
}

.genre-search {
  display: inline-block;
  text-align: center;
  margin: 20px 0 20px 0;
}


.genre {
  float: left;
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

img.selected {
  border-color: #002d72;
}

</style>
