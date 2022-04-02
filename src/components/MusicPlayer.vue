<template>
  <div class="container-fluid px-0 music-player">
    <div class="row">
      <div class="col">
        <div class="card flatten">
          <span
            class="card-img-top card-overlay"
            v-html="require('../assets/pause-fill.svg')"
            @click="pause"
          ></span>
          <img class="card-img-top" :src="require(song.url)" />
          <div class="card-body">
            <h5 class="card-title">{{ song.title }}</h5>
            <p class="card-text">{{ song.album }}, {{ song.artist }}</p>
            <div class="progress" style="height: 1px">
              <div
                class="progress-bar"
                role="progressbar"
                :style="'width: ' + (progress / duration) * 100 + '%'"
                :aria-valuenow="progress"
                aria-valuemin="0"
                :aria-valuemax="duration"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!--
      <div class="col d-flex align-items-center">
        <div class="btn-group" role="group" aria-label="Play controls">
          <button
            type="button"
            class="btn btn-dark"
            v-for="icon in [
              'skip-backward-fill',
              'play-circle',
              'skip-forward-fill',
            ]"
            :key="icon"
          >
            <span class="icon" v-html="require(`../assets/${icon}.svg`)"></span>
          </button>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MusicPlayer",
  data() {
    return {
      progress: 0,
      playBackSpeed: 1000,
    };
  },
  methods: {
    pause() {
      this.playBackSpeed === 0
        ? (this.playBackSpeed = 1000)
        : (this.playBackSpeed = 0);
    },
  },
  created: function () {
    if (this.song && this.duration) {
      var self = this;
      let timer = setInterval(function () {
        if (self.progress < self.duration) {
          self.progress++;
        } else {
          clearInterval(timer);
          self.$store.commit("nowPlaying", null);
        }
      }, this.playBackSpeed);
    }
  },
  computed: mapState({
    song: (state) => state.playing,
    duration() {
      let dur = this.song.duration.split(":");
      //Convert to seconds
      return parseInt(dur[0] * 60, 10) + parseInt(dur[1], 10);
    },
  }),
};
</script>

<style scoped>
.music-player {
  background-color: #000000c9;
  position: fixed;
  bottom: 0;
  z-index: 2;
  height: 6rem;
  color: white;
}
.card.flatten {
  flex-direction: row;
  background-color: transparent;
  max-width: fit-content;
}

.card-img-top {
  background-color: grey;
  width: 6rem;
  height: 6rem;
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