<template>
  <div class="col d-flex flex-wrap py-3 gap-3">
    <div class="card" v-for="song of searchResults" :key="song">
      <span
        class="card-img-top card-overlay"
        v-html="require('../assets/play-fill.svg')"
        @click="playSong(song)"
      ></span>
      <img class="card-img-top" :src="require(song.url)" />
      <div class="card-body">
        <h5 class="card-title">{{ song.title }}</h5>
        <p class="card-text">
          {{ song.album }}, {{ song.artist }} <br />Duration:
          {{ song.duration }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Songs",
  props: {
    urlQuery: String,
  },
  methods: {
    playSong(song) {
      song.timestamp = Date.now();
      this.$store.commit("nowPlaying", song);
      this.$store.commit("appendPlayed", song);
    },
    sortSongs() {
      let sortedSongs = [];
      for (let artist of this.records) {
        if (artist["albums"]) {
          for (let album of artist["albums"]) {
            if (album["songs"]) {
              for (let song of album["songs"]) {
                sortedSongs.push({
                  title: song.title,
                  duration: song.length,
                  album: album.name,
                  artist: artist.name,
                  url: artist.url,
                });
              }
            }
          }
        }
      }
      return sortedSongs.sort(this.sortArray[this.sortMethod]);
    },
  },
  computed: {
    ...mapState(["sortMethod", "sortArray", "records"]),
    query() {
      if (this.urlQuery) {
        this.$store.commit("navigate", "Songs");
        this.$store.commit("query", this.urlQuery);
        return this.$store.state.query;
      } else {
        this.$store.commit("query", "");
        return this.$store.state.query;
      }
    },
    searchResults() {
      return this.sortSongs().filter((item) => {
        return (
          item.artist.toLowerCase().includes(this.query.toLowerCase()) ||
          item.album.toLowerCase().includes(this.query.toLowerCase()) ||
          item.title.toLowerCase().includes(this.query.toLowerCase())
        );
      });
    },
  },
};
</script>

<style scoped>
.card {
  flex-direction: row;
  max-width: none;
  width: 100%;
  align-items: center;
}
.card .card-img-top {
  max-width: 7rem;
  max-height: 7rem;
}
.card-img-top.card-overlay {
  position: absolute;
  background-color: transparent;
  color: #ffffffb9;
  transition: opacity 100ms linear;
}
.card-img-top.card-overlay:hover {
  opacity: 1;
  cursor: pointer;
}

.card:last-of-type {
  margin-bottom: 7rem;
}

.card.playing {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  scale: 1.03;
  border-left: 5px solid red;
}

@media only screen and (min-width: 576px) {
  /* Show play buttons on mobile */
  .card-img-top.card-overlay {
    opacity: 0;
  }
}

@media only screen and (max-width: 576px) {
  /* Show play buttons on mobile */
  .card-img-top.card-overlay {
    opacity: 0.8;
  }
}
</style>