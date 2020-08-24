<template>
  <div id="app">
    <!--     <p v-if="endTime">
      O comboio partiu às {{ startTime }} e chega por volta das {{ endTime }}
    </p>-->
    <div class="container">
      <span
        v-if="startCity"
        id="start"
        class="start"
        :style="startCity.coor"
      ></span>
      <span v-if="endCity" id="end" class="end" :style="endCity.coor"></span>
      <img src="./assets/mapa.png" />
      <img
        v-if="tripDuration"
        class="train"
        :style="path"
        src="./assets/train.svg"
      />
    </div>
    <form>
      <label>Partida</label>
      <select v-model="startCity">
        <option
          v-for="distrito in distritos"
          :value="distrito"
          :key="distrito.id"
          >{{ distrito.name }}</option
        >
      </select>
      <label>Destino</label>
      <select v-model="endCity">
        <option
          v-for="distrito in distritos"
          :value="distrito"
          :key="distrito.id"
          >{{ distrito.name }}</option
        >
      </select>
      <br />
      <br />
      <label for="start">Start</label>
      <input v-model="startTime" type="time" />
      <label for="end">End</label>
      <input v-model="endTime" type="time" />
      <br />
      <br />
      <button @click.prevent="getJourney">Go!</button>
      <p v-if="tripDuration">A viagem demora {{ tripDuration }} horas</p>
    </form>

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
      startCity: null,
      endCity: null,
      tripDuration: null,
      path: {
        offsetDistance: null,
        offsetPath: null,
      },
      distritos: [
        { name: "Viana do Castelo", coor: "top: 250px;left: 300px;" },
        { name: "Braga", coor: "top: 140px;left: 220px;" },
        { name: "Porto", coor: "top: 215px;left: 220px;" },
        { name: "Vila Real", coor: "top: 160px;left: 340px;" },
        { name: "Bragança", coor: "top: 160px;left: 460px;" },
        { name: "Guarda", coor: "top: 330px;left: 410px;" },
        { name: "Viseu", coor: "top: 300px;left: 300px;" },
        { name: "Aveiro", coor: "top: 310px;left: 210px;" },
        { name: "Coimbra", coor: "top: 425px;left: 220px;" },
        { name: "Castelo Branco", coor: "top: 475px;left: 360px;" },
        { name: "Leiria", coor: "top: 515px;left: 145px;" },
        { name: "Santarem", coor: "top: 605px;left: 195px;" },
        { name: "Portalegre", coor: "top: 625px;left: 335px;" },
        { name: "Lisboa", coor: "top: 700px;left: 75px;" },
        { name: "Évora", coor: "top: 755px;left: 305px;" },
        { name: "Setúbal", coor: "top: 825px;left: 190px;" },
        { name: "Beja", coor: "top: 905px;left: 280px;" },
        { name: "Faro", coor: "top: 1035px;left: 250px;" },
      ],
    };
  },
  mounted() {},
  methods: {
    getJourney: function() {
      this.getDuration();
      this.createPath();
      this.getPath();
    },
    createPath: function() {
      LeaderLine.setLine(
        document.getElementById("start"),
        document.getElementById("end"),
        {
          color: "#ef1e28",
          startPlug: "square",
          endPlug: "square",
          startPlugColor: "blue",
          endPlugColor: "blue",
          startPlugSize: 1.5,
          endPlugSize: 1.5,
          dash: true,
          path: "straight",
        }
      );
    },
    getPath: function() {
      var pathValue = document
        .querySelector("#leader-line-1-line-path")
        .getAttribute("d");

      this.path.offsetPath = "path('" + pathValue + "')";
    },
    getDuration: function() {
      var start = moment(this.startTime, "HH:mm");
      var end = moment(this.endTime, "HH:mm");

      this.tripDuration = end.diff(start, "hours", true);
      this.calculation(start, end);
    },
    calculation: function(start, end) {
      if (moment().isBetween(start, end)) {
        var a = Math.abs(moment() - moment(start));
        var b = Math.abs(moment(end) - moment(start));
        var percentage = Math.round((a / b) * 100);

        this.path.offsetDistance = percentage + "%";
        return;
      }

      return console.log("no");
    },
    setMarkers: function() {},
  },
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

img {
  width: 600px;
}

.train {
  width: 45px;
  top: 0;
  left: 0;
  position: absolute;
  offset-rotate: reverse;
}

.js-btn {
  background-color: rebeccapurple;
  color: white;
  font-weight: bold;
  padding: 1rem;
}
</style>
