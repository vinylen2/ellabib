<template>
  <header class="header">
    <div class="container">
      <router-link to="/">Hem</router-link>
      <router-link to="/books">Böcker</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'navbar',
};
</script>

<style scoped>

.container {
  width: 100%;
  background-color: #addb91;
  display: block;
  height: 70px;
  margin-bottom: 20px;
}

a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding-left: 50px;
  text-decoration: none;
  font-size: 17px;
  line-height:70px;
}

</style>
