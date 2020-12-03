<template>
  <div class="home">
    <div class="logo">
      <i class="fas fa-flask"></i>
      <p>Laboratorio #1: Servicios y Middleware</p>
    </div>
    <div class="cardContainer">
      <card
        server="Servidor 1"
        v-bind:date="server1.dateChecked"
        v-bind:code="server1.code"></card>

      <card
        server="Servidor 2"
        v-bind:date="server2.dateChecked"
        v-bind:code="server2.code"></card>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import Card from '../components/Card.vue';

const API_URL = 'http://localhost:8002/server-status';

interface ServerLog {
  dateChecked: string;
  code: number;
}

const server1 = ref<ServerLog>({
  dateChecked: '',
  code: 0,
});

const server2 = ref<ServerLog>({
  dateChecked: '',
  code: 0,
});

export default {
  setup(): any {
    return {
      server1,
      server2,
    };
  },
  mounted(): any {
    fetch(API_URL).then((response) => response.text()).then((data) => {
      try {
        const serversStatus = JSON.parse(data) as ServerLog[];
        server1.value.dateChecked = serversStatus[0].dateChecked;
        server1.value.code = serversStatus[0].code;
        server2.value.dateChecked = serversStatus[1].dateChecked;
        server2.value.code = serversStatus[1].code;
        console.log(server2.value);
      } catch (error) {
        console.log('The response is malformed!');
      }
    });
  },
  components: {
    Card,
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin: 2rem;
  background: #FFFFFF;
  border-radius: 15px;

  .logo {
    padding: 3rem;

    i.fas.fa-flask {
      font-size: 7rem;
      margin: 1rem;
    }
    p {
      margin: 0;
      font-size: 2rem;
      font-weight: bold;
    }
  }

  .cardContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
}
</style>
