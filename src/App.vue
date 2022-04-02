<template>
  <div class="container-fluid px-0">
    <MusicHeader></MusicHeader>
    <div class="container-fluid">
      <div class="row fill-height">
        <SideMenu></SideMenu>
        <div class="col">
          <SearchBar></SearchBar>
          <SearchTools></SearchTools>
          <SearchResults></SearchResults>
          <div class="row">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <OffCanvasMenu></OffCanvasMenu>
    <Transition name="slide-up">
      <MusicPlayer v-if="playing != null"></MusicPlayer>
    </Transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SideMenu from "./components/SideMenu.vue";
import OffCanvasMenu from "./components/OffCanvasMenu.vue";
import MusicHeader from "./components/MusicHeader.vue";
import SearchBar from "./components/SearchBar.vue";
import MusicPlayer from "./components/MusicPlayer.vue";
import SearchResults from "./components/SearchResults.vue";
import SearchTools from "./components/SearchTools.vue";
//Import cover art statically
import "@/assets/artist-covers/artist-andrew-bird.jpg";
import "@/assets/artist-covers/artist-cosmos-sheldrake.jpg";
import "@/assets/artist-covers/artist-gogol-bordello.jpg";
import "@/assets/artist-covers/artist-squirrel-nut-zippers.jpg";
import "@/assets/artist-covers/artist-the-burns-unit.jpg";
//import svgs statically
import "@/assets/people-fill.svg";
import "@/assets/disc.svg";
import "@/assets/music-note.svg";
import "@/assets/music-note-beamed.svg";
import "@/assets/music-note-list.svg";
import "@/assets/skip-backward-fill.svg";
import "@/assets/play-circle.svg";
import "@/assets/skip-forward-fill.svg";
import "@/assets/filter.svg";
import "@/assets/sort-up.svg";
import "@/assets/sort-down.svg";

export default {
  name: "App",
  components: {
    SideMenu: SideMenu,
    OffCanvasMenu: OffCanvasMenu,
    MusicHeader: MusicHeader,
    SearchBar: SearchBar,
    SearchResults: SearchResults,
    SearchTools: SearchTools,
    MusicPlayer: MusicPlayer,
  },
  computed: {
    ...mapState(["playing", "tab", "query"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

span.icon svg {
  scale: 1.5;
  margin: 0rem 0.5rem;
}

.dark-menu > label {
  border: none;
  color: white;
  padding: 0.5rem 2rem;
}

.card {
  max-width: 10rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.card-img,
.card-img-top {
  background-color: #000000a3;
}

.card-img-top svg {
  width: 100%;
  height: 100%;
}

input.form-control {
  color: white;
  background-color: #ffffff1a;
  border: none;
}

input.form-control:focus {
  color: white;
  background-color: #ffffff1a;
  border-color: transparent;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.fill-height {
  min-height: 100vh;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.8s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(5rem);
}
</style>
