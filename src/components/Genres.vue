<template>
  <div class="col d-flex flex-wrap py-3 gap-3">
    <div class="card" v-for="genre of searchResults" :key="genre">
      <span
        class="card-img-top"
        v-html="require('@/assets/people-fill.svg')"
      ></span>
      <img class="card-img-top" src="" />
      <div class="card-body">
        <h5 class="card-title">{{ genre.title }}</h5>
        <p class="card-text">
          {{ genre.artist }}
          <br />
          <button
            @click="viewArtists(genre.artist)"
            class="btn btn-outline-primary"
          >
            {{ genre.length }} Artists
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Genres",
  props: {
    urlQuery: String,
  },
  methods: {
    sortGenres() {
      let genres = {};
      for (let artist of this.records) {
        genres[this.artist.genre].push(artist.name);
      }
      console.log(genres);
      return genres.sort(this.sortArray[this.sortMethod]);
    },
    viewArtists(artist) {
      this.$router.push({ path: "/artist", query: { q: artist } });
    },
  },
  computed: {
    ...mapState(["sortMethod", "sortArray", "records"]),
    query() {
      if (this.urlQuery) {
        this.$store.commit("navigate", "Genres");
        this.$store.commit("query", this.urlQuery);
        return this.$store.state.query;
      } else {
        this.$store.commit("query", "");
        return this.$store.state.query;
      }
    },
    searchResults() {
      return this.sortGenres().filter((item) => {
        let genre = item.title.toLowerCase();
        let query = this.query.toLowerCase();
        return genre.includes(query);
      });
    },
  },
};
</script>

<style scoped>
</style>