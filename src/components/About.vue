<template>
  <div class="container">
    <h1>Ellabib</h1>
    <div class="text">
      <p>Ellabib är en app för Ellagårdsskolans bibliotek. Här hittar ni bokrecensioner skrivna och upplästa av våra elever.</p>
      <h2>Bilder</h2>
      <p>Omslagsbilder kommer från <a href="https://bokhavet.se/api">Bokhavets API</a>.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
};
</script>

<style scoped>
p {
  text-align: left;
  margin: 20px;
}

h1 {
  font-weight: 700;
  font-size: 2em;
}

h2 {
  font-weight: 700;
  font-size: 1.5em;
}
</style>
