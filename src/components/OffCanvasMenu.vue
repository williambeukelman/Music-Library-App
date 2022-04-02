<template>
  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvas-menu"
    aria-labelledby="offcanvas-menu-label"
  >
    <div class="offcanvas-header bg-dark text-white">
      <h5 class="offcanvas-title" id="offcanvas-menu-label">Menu</h5>
      <button
        type="button"
        class="btn-close text-reset bg-secondary"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body bg-dark">
      <div class="btn-group-vertical dark-menu w-100">
        <template v-for="item in menu" :key="item">
          <input
            type="radio"
            :value="item.name"
            v-model="tab"
            class="btn-check"
            name="btnradio"
            :id="'btn-' + item.name"
            autocomplete="off"
          />
          <label class="btn btn-outline-secondary" :for="'btn-' + item.name"
            ><span
              class="icon"
              v-html="require('@/assets/' + item.icon)"
            ></span>
            {{ item.name }}</label
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OffCanvasMenu",
  props: {},
  data() {
    return {
      selected: "Artists",
      menu: [
        { name: "Artists", icon: "people-fill.svg" },
        { name: "Albums", icon: "disc.svg" },
        { name: "Songs", icon: "music-note.svg" },
        { name: "Genres", icon: "music-note-beamed.svg" },
        { name: "Recent", icon: "music-note-list.svg" },
      ],
    };
  },
  computed: {
    tab: {
      get() {
        return this.$store.state.tab;
      },
      set(value) {
        this.$router.push({
          path: "/" + value.toLowerCase(),
          query: {},
        });
        this.$store.commit("navigate", value);
      },
    },
  },
};
</script>

<style scoped>
</style>
