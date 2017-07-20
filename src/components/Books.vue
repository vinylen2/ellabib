<template>
  <div class="container">
    <div class="genreSearch">
      <div v-for="genre in genres" class="genre">
        <img v-on:click="addGenreToQuery(genre.id)" class="genreIcon" :src="`http://37.46.165.87/images/${genre.slug}.png`"/>
      </div>

    </div>
    <div class="wrapper">
      <div v-for="book in books" class="book">
        <h3>{{ book.title }}</h3>
        <router-link :to="{ name: 'bok', params: { slug: book.slug, book: book }}">
          <img :src="`http://37.46.165.87/images/${book.imageUrl}`">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Books from '@/api/services/books';
import Genres from '@/api/services/genres';

export default {
  name: 'frontpage',
  data() {
    return {
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
    selectedGenre() {

    },
    addGenreToQuery(genreId) {
      const arrayIndex = this.queryParams.genre.indexOf(genreId);
      if (arrayIndex === -1) {
        this.queryParams.genre.push(genreId);
      } else {
        this.queryParams.genre.splice(arrayIndex, 1);
      }

      console.log(this.queryParams.genre.length);
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
          console.log(result.data);
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

.book {
  width: 98.0%;
  margin: 0 1.0% 10px;
  box-sizing: border-box;
  float:left;
}
@media (min-width: 500px) {
    .book {
        width: 48.0%;
    }
}
@media (min-width: 700px) {
    .book {
        width: 31.3333333333333%;
    }
}
@media (min-width: 980px) {
    .book {
        width: 23.0%;
    }
}

.genreSearch {
  display: inline-block;
  text-align: center;

}

.genre {
  float: left;
}

.genreIcon {
  border-radius: 100%;
  border: 3px solid transparent;
  width: 60px;
}

</style>
