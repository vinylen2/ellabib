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
  height: 50px;
}

a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

</style>
