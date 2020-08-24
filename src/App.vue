<template>
  <div id="app">
    <form>
      <label for="start">Start</label>
      <input v-model="startTime" type="time" />
      <label for="end">End</label>
      <input v-model="endTime" type="time" />
      <button @click.prevent="getDuration">Go!</button>
    </form>
    <!--     <p v-if="endTime">
      O comboio partiu às {{ startTime }} e chega por volta das {{ endTime }}
    </p> -->
    <div class="container">
      <span id="start" class="start"></span>
      <span id="end" class="end"></span>
      <img src="./assets/mapa.png" />
      <img class="train" src="./assets/train.svg" />
    </div>
    <!--     <button @click.prevent="getJourney" class="js-btn">OLA</button>
    -->
  </div>
</template>

<script>
import LeaderLine from "leader-line-vue";
var moment = require("moment"); // require

export default {
  name: "App",
  data: function() {
    return {
      startTime: "",
      endTime: "",
      tripDuration: null,
    };
  },
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
    getDuration: function() {
      var start = moment(this.startTime, "hh:mm");
      var end = moment(this.endTime, "hh:mm");

      var result = end.diff(start, "hours", true);

      this.calculation(start, end, result);
    },
    calculation: function(start, end, duration) {
      var now = moment().format("HH:mm");
      console.log(duration);
      console.log(now);
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
  offset-distance: 0%;
}

.js-btn {
  background-color: rebeccapurple;
  color: white;
  font-weight: bold;
  padding: 1rem;
}
</style>
