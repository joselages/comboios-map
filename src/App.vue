<template>
  <div id="app">
    <div class="container">
      <span id="start" class="start"></span>
      <span id="end" class="end"></span>
      <img src="./assets/mapa.png" />
      <img class="train" src="./assets/train.svg" />
    </div>
    <button @click.prevent="getJourney" class="js-btn">OLA</button>
  </div>
</template>

<script>
import LeaderLine from "leader-line-vue";
const comboios = require("comboios");

export default {
  name: "App",
  mounted() {
    LeaderLine.setLine(
      document.getElementById("start"),
      document.getElementById("end"),
      {
        color: "#ef1e28",
        startPlug: "square",
        endPlug: "square",
        startPlugColor: "transparent",
        endPlugColor: "transparent",
        startPlugSize: 1.5,
        endPlugSize: 1.5,
        dash: true,
        path: "straight",
      }
    );
  },
  methods: {
    getJourney: function () {
      const porto = "94-2006";
      const lisboa = {
        type: "station",
        id: "94-30007",
        name: "Lisboa - Santa Apolonia",
      };

      comboios.journeys(porto, lisboa).then(console.log).catch(console.error);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  display: flex;
  align-items: center;
}
.container {
  position: relative;
}

.start,
.end {
  position: absolute;
}

.start {
  top: 75px;
  left: 200px;
}

.end {
  top: 700px;
  left: 75px;
}

img {
  width: 600px;
}

.train {
  width: 45px;
  top: 0;
  left: 0;
  position: absolute;
  /* transform: rotate(-180deg); */
  offset-rotate: reverse;
  offset-path: path("M 200 75 L 75 700");
  offset-distance: 00%;
}

.js-btn {
  background-color: rebeccapurple;
  color: white;
  font-weight: bold;
  padding: 1rem;
}
</style>
