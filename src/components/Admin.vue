<template>
  <div>
    <div class="admin-nav">
      <router-link to="/admin/post-book">Lägg till bok</router-link>
      <router-link to="/admin/activate-reviews">Aktivera</router-link>
      <router-link to="/admin/qr-codes">QR ({{$store.state.qrArray.length}})</router-link>
      <a @click="addAllQr">
        QR för alla böcker
      </a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Books from '@/api/services/books';

export default {
  name: 'admin',
  metaInfo: {
    title: 'Adminpanelen',
  },
  methods: {
    addAllQr() {
      Books.getAll()
        .then((result) => {
          this.$store.commit('addQrArray', result.data);
        });
    },
  },
};
</script>

<style scoped>

.admin-nav {
  width: 100%;
  background-color: #9ddad8;
  display: block;
  height: 60px;
}

a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding-left: 20px;
  font-size: 1.5em;
  text-decoration: none;
  line-height:60px;
  cursor: pointer;
}

a:hover {
  color: black;
  font-weight: bold;
}


@media print {
  .admin-nav {
    display: none;
  }
}
</style>
