<template>
  <div class="container">
    <h1>Ellabib</h1>
    <div class="text">
      <p>Ellabib är en hemsida för Ellagårdsskolans bibliotek. Här hittar ni bokrecensioner skrivna och upplästa av våra elever.</p>
      <h2>Källor</h2>
      <p>Informationen om böckerna kommer från <a href="https://bokhavet.se/api">Bokhavets API</a>.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  metaInfo: {
    title: 'Om sidan',
  },
};
</script>

<style scoped>
p {
  text-align: left;
  margin: 20px;
}

h1 {
  margin-top: 20px;
  font-weight: 700;
  font-size: 2em;
}

h2 {
  font-weight: 700;
  font-size: 1.5em;
}
</style>
