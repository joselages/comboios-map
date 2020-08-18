import Vue from "vue";
import App from "./App.vue";
/* import LoadScript from "vue-plugin-load-script";

Vue.use(LoadScript);
Vue.loadScript("leader-line.min.js"); */

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  /*   mounted() {
    new LeaderLine(
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
  }, */
}).$mount("#app");
