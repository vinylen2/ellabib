<template>
  <div class="container">
    <div class="genre-search">
      <div v-for="genre in genres" class="genre">
        <img v-on:click="addGenreToQuery(genre.id)" class="genre-icon" :src="`${imagesUrl}${genre.slug}.png`"/>
      </div>

    </div>
    <div class="wrapper flex-container">
      <div v-for="book in books" class="book">
        <router-link :to="{ name: 'bok', params: { slug: book.slug }}">
          <img :src="`${imagesUrl}${book.imageUrl}`">
          <h3>{{ book.title }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Books from '@/api/services/books';
import Genres from '@/api/services/genres';
import Urls from '@/assets/urls';

export default {
  name: 'frontpage',
  data() {
    return {
      imagesUrl: Urls.images,
      books: [],
      image: '',
      genres: [],
      queryParams: { genre: [] },
    };
  },
  created() {
    this.getGenres();
    this.getBooks();
  },
  methods: {
    addGenreToQuery(genreId) {
      const arrayIndex = this.queryParams.genre.indexOf(genreId);
      if (arrayIndex === -1) {
        this.queryParams.genre.push(genreId);
      } else {
        this.queryParams.genre.splice(arrayIndex, 1);
      }

      if (this.queryParams.genre.length < 1) {
        this.getBooks();
      } else {
        this.getBooksFromGenres();
      }
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
    getGenres() {
      Genres.getAll()
        .then((result) => {
          this.genres = result.data;
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

.genre-icon {
  border-radius: 100%;
  border: 3px solid transparent;
  width: 60px;
}

</style>
