<template>
  <div class="container-fluid px-0 music-header">
    <div class="row px-5 pt-4">
      <div class="col">
        <h1>Music Player & Library</h1>
      </div>
    </div>
    <div
      class="row d-none justify-content-center align-items-center py-3 px-1 gx-0"
    >
      <div class="col">
        <div class="progress">
          <div
            class="progress-bar bg-dark"
            role="progressbar"
            style="width: 50%"
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            1:25
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-dark"
          data-bs-container="body"
          data-bs-toggle="popover"
          data-bs-placement="bottom"
          data-bs-content="Bottom popover"
        >
          <span
            class="icon"
            v-html="require('../assets/volume-up-fill.svg')"
          ></span>
        </button>
        <!--<input type="range" class="form-range" id="volume-range" />-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicHeader",
  props: {},
};
</script>

<style scoped>
.music-header {
  background: linear-gradient(to left, tomato, crimson);
  color: white;
}
</style>