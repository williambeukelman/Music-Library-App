<template>
  <div class="col d-flex flex-wrap py-3 gap-3">
    <div class="card" v-for="artist in searchResults" :key="artist">
      <span
        class="card-img-top card-placeholder"
        v-html="require('../assets/people-blank.svg')"
      ></span>
      <img class="card-img-top" :src="require(artist.url)" />
      <div class="card-body">
        <h5 class="card-title">{{ artist.title }}</h5>
        <button
          class="card-text btn btn-outline-primary"
          @click="viewAlbums(artist.title)"
        >
          {{ artist.albums }}
          {{ artist.albums > 1 ? "Albums" : "Album" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Artists",
  props: {
    urlQuery: String,
  },
  methods: {
    sortArtists() {
      let artists = [];
      for (let artist of this.records) {
        artists.push({
          title: artist.name,
          albums: artist.albums.length,
          url: artist.url,
        });
      }
      return artists.sort(this.sortArray[this.sortMethod]);
    },
    viewAlbums(artist) {
      this.$router.push({ path: "/albums", query: { q: artist } });
    },
  },
  computed: {
    ...mapState(["sortMethod", "sortArray", "records"]),
    query() {
      if (this.urlQuery) {
        this.$store.commit("navigate", "Artists");
        this.$store.commit("query", this.urlQuery);
        return this.$store.state.query;
      } else {
        this.$store.commit("query", "");
        return this.$store.state.query;
      }
    },
    searchResults() {
      return this.sortArtists()
        .sort(this.sortArray[this.sortMethod])
        .filter((item) => {
          return item.title.toLowerCase().includes(this.query.toLowerCase());
        });
    },
  },
};
</script>

<style scoped>
.card-placeholder {
  width: 7rem;
  height: 7rem;
  background-color: grey;
  position: absolute;
  z-index: -1;
}
</style>