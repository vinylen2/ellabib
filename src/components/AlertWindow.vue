<template>
  <div class="wrapper">
    <h3>Vill du verkligen...</h3>
    <p>{{action}}?</p>
    <div class="menu">
      <button class="button float add"
        @click="closed(true)">Ja
      </button>
      <button class="button float close"
        @click="closed(false)">Nej
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alert-window',
  props: [
    'action',
    'value',
  ],
  created() {
    window.addEventListener('keyup', (event) => {
      if (event.which === 13) {
        this.editText();
      }
    });
  },
  methods: {
    closed(status) {
      this.$emit('closed', { status, value: this.value });
    },
  },
};

</script>

<style scoped>
.wrapper {
  text-align: center;
}

.button {
  margin: 10px 10px;
  padding: 0 5px;
  width: 150px;
  height: 2em;
  line-height: 2em;
  font-weight: bold;
  font-size: 1.5em;
  background-color: #c98bdb;
  border-radius: 15px;
  border:none;
  text-align: center;
  cursor: pointer;
}

.close {
  background-color: #ff585d;
}

.add {
  background-color: #71c5e8;
}
h3 {
  font-size: 1.5em;
  text-align: center;
  font-weight: bold;
  margin: 20px 0;
}

.menu {
  display: inline-block;
  margin: 0 auto;
  margin-top: 15px;
}
</style>
