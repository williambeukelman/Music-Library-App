<template>
  <div
    class="row d-flex justify-content-between align-items-center bg-dark text-white"
  >
    <div class="col-1 d-sm-block d-md-none">
      <button
        class="btn btn-dark"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas-menu"
        aria-controls="offcanvas-menu"
      >
        <span class="icon" v-html="require('../assets/list.svg')"></span>
      </button>
    </div>
    <div class="col pt-2">
      <h4 class="ps-5 d-sm-block d-md-none">{{ tab }}</h4>
      <!--
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Artists</a></li>
          <li class="breadcrumb-item"><a href="#">Albums</a></li>
          <li class="breadcrumb-item active" aria-current="page">Songs</li>
        </ol>
      </nav>
      -->
    </div>
    <div class="col">
      <div class="input-group">
        <div class="input-group-prepend">
          <button class="btn btn-dark" type="button">
            <span class="icon" v-html="require('../assets/search.svg')"></span>
          </button>
        </div>
        <input
          type="text"
          class="form-control"
          v-model="query"
          placeholder="Search"
          aria-label="search"
          aria-describedby="tool-search"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {},
  computed: {
    tab() {
      return this.$store.state.tab;
    },
    query: {
      get() {
        return this.$store.state.query;
      },
      set(value) {
        this.$store.commit("query", value);
        let loc = this.$store.state.tab.toLowerCase();
        if (value.length > 0) {
          this.$router.replace({ path: "/" + loc, query: { q: value } });
        } else {
          this.$router.replace({ path: "/" + loc });
        }
      },
    },
  },
};
</script>

<style scoped>
.breadcrumb-item a {
  color: white;
}
</style>