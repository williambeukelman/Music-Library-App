<template>
  <div class="col d-flex flex-wrap py-3 gap-3">
    <div class="card" v-for="song of recent" :key="song">
      <img class="card-img-top" :src="require(song.url)" />
      <div class="card-body">
        <h5 class="card-title">{{ song.title }}</h5>
        <p class="card-text">
          {{ song.album }}, {{ song.artist }} <br />Duration:
          {{ song.duration }}, Last Played: {{ timeDelta(song.timestamp) }}
        </p>
      </div>
    </div>
    <h3 v-if="recent.length < 1">Nothing has been played yet.</h3>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Recent",
  created() {
    this.$store.commit("query", "");
  },
  methods: {
    timeDelta(time) {
      let now = Date.now();
      let delta = (now - time) / 1000;
      if (delta < 60) {
        return `${(delta / 60).toFixed(0)} second(s) ago`;
      } else if (delta > 60 && delta < 3600) {
        return `${(delta / 60).toFixed(0)} minute(s) ago`;
      } else if (delta > 3600 && delta < 86400) {
        return `${(delta / 3600).toFixed(0)} hour(s) ago`;
      } else if (delta > 86400 && delta < 2592000) {
        return `${(delta / 86400).toFixed(0)} day(s) ago`;
      } else {
        return "a while ago";
      }
    },
  },
  computed: mapState({
    recent: (state) => state.played,
  }),
};
</script>

<style scoped>
.card {
  flex-direction: row;
  max-width: none;
  width: 100%;
}
.card .card-img-top {
  max-width: 7rem;
}
</style>