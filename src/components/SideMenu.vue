<template>
  <div class="col-2 d-none d-md-block text-center bg-dark text-white">
    <h3 class="p-2">Menu</h3>
    <div class="btn-group-vertical dark-menu">
      <template v-for="item in menu" :key="item">
        <input
          type="radio"
          :value="item.name"
          v-model="tab"
          class="btn-check"
          :name="item.name"
          :id="'btn-' + item.name"
          autocomplete="off"
        />
        <label class="btn btn-outline-secondary" :for="'btn-' + item.name"
          ><span class="icon" v-html="require('@/assets/' + item.icon)"></span>
          {{ item.name }}</label
        >
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {
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
        //this.$store.commit("query", "");
        //console.log("Navigated, url: ", this.$route.query.q);
      },
    },
  },
};
</script>

<style scoped>
</style>
