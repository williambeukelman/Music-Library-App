import { createApp } from "vue";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
//Import data from json file
import records from "@/assets/records.json";
//Import pages
import Artists from "./components/Artists.vue";
import Albums from "./components/Albums.vue";
import Genres from "./components/Genres.vue";
import Songs from "./components/Songs.vue";
import Recent from "./components/Recent.vue";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      tab: "Artists",
      query: "",
      records: records.records,
      played: [],
      playing: null,
      sortMethod: "alphabetical",
      sortArray: {
        alphabetical: (a, b) => a.title.localeCompare(b.title),
        alphabetical_reverse: (a, b) => b.title.localeCompare(a.title),
        date: (a, b) => a.date.localeCompare(b.date),
        date_reverse: (a, b) => b.date.localeCompare(a.date),
        duration: (a, b) => a.duration.localeCompare(b.duration),
        duration_reverse: (a, b) => b.duration.localeCompare(a.duration)
      }
    };
  },
  mutations: {
    sort(state, method) {
      state.sortMethod = method;
    },
    navigate(state, address) {
      state.tab = address;
    },
    query(state, q) {
      state.query = q;
    },
    appendPlayed(state, song) {
      state.played.push(song);
    },
    nowPlaying(state, song) {
      state.playing = song;
    }
  }
});

const routes = [
  {
    path: "/",
    redirect: "/artists"
    //component: Artists,
    //props: (route) => ({ urlQuery: route.query.q })
  },
  {
    path: "/artists",
    component: Artists,
    props: (route) => ({ urlQuery: route.query.q })
  },
  {
    path: "/albums",
    component: Albums,
    props: (route) => ({ urlQuery: route.query.q })
  },
  {
    path: "/songs",
    component: Songs,
    props: (route) => ({ urlQuery: route.query.q })
  },
  { path: "/genres", component: Genres },
  { path: "/recent", component: Recent }
];

const router = createRouter({
  history: createWebHistory(),
  routes // short for `routes: routes`
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
