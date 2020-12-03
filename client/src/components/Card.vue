<template>
  <div v-bind:class="{okCard: code==200, errorCard: code==503}">
    <div v-if="code==200">
      <i class="fas fa-check-circle"></i>
      <p>{{server}}</p>
      <p>¡Servidor en funcionamiento!</p>
      <p>{{date}}</p>
    </div>

    <div v-if="code==503">
      <i class="fas fa-exclamation-circle"></i>
      <p>{{server}}</p>
      <p>¡Servidor caído!</p>
      <p>{{date}}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    server: String,
    date: String,
    code: Number,
  },
  setup(props: any) {
    console.log(props.code);
  },
};
</script>

<style lang="scss" scoped>
.okCard {
  margin: 2rem;
  padding: 2rem 1rem;
  width: 12rem;
  justify-content: center;
  border-radius: 15px;

  background: #e2e2e2;

  i {
    color: #78c737;
    font-size: 5rem;
  }
}
.errorCard {
  margin: 2rem;
  padding: 2rem 1rem;
  width: 12rem;
  justify-content: center;
  border-radius: 15px;

  background: #e2e2e2;

  i {
    color: #c73737;
    font-size: 5rem;
  }
}
</style>
