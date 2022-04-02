<template>
  <div class="col d-flex flex-wrap py-3 gap-3">
    <div class="card" v-for="album of searchResults" :key="album">
      <img class="card-img-top" :src="require(album.url)" />
      <div class="card-body">
        <h5 class="card-title">{{ album.title }}</h5>
        <p class="card-text">
          {{ album.artist }}, {{ album.date }}
          <br />
          <button
            @click="viewSongs(album.artist, album.title)"
            class="btn btn-outline-primary"
          >
            {{ album.songs }} Songs
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Albums",
  props: {
    urlQuery: String,
  },
  methods: {
    sortAlbums() {
      let albums = [];
      for (let artist of this.records) {
        if (artist["albums"]) {
          for (let album of artist["albums"]) {
            albums.push({
              title: album.name,
              artist: artist.name,
              date: album.date,
              songs: album.songs.length,
              url: artist.url,
            });
          }
        }
      }
      return albums.sort(this.sortArray[this.sortMethod]);
    },
    viewSongs(artist, album) {
      this.$router.push({ path: "/songs", query: { q: album } });
    },
  },
  computed: {
    ...mapState(["sortMethod", "sortArray", "records"]),
    query() {
      if (this.urlQuery) {
        this.$store.commit("navigate", "Albums");
        this.$store.commit("query", this.urlQuery);
        return this.$store.state.query;
      } else {
        this.$store.commit("query", "");
        return this.$store.state.query;
      }
    },
    searchResults() {
      return this.sortAlbums().filter((item) => {
        let artist = item.artist.toLowerCase();
        let title = item.title.toLowerCase();
        let query = this.query.toLowerCase();
        return (
          artist.includes(query) ||
          title.includes(query) ||
          item.date.includes(this.query)
        );
      });
    },
  },
};
</script>

<style scoped>
h5.card-title {
  max-width: 10rem;
}
</style>

