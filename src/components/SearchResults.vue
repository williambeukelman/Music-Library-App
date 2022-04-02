<template>
  <div v-if="query.length > 0" class="row pt-3 bg-transparent text-uppercase">
    <div class="col">
      <div>
        <h3 class="d-none d-md-block">Search Results for "{{ query }}":</h3>
        <p class="d-block d-md-none">Search Results for "{{ query }}":</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResults",
  props: {},
  computed: {
    query: {
      get() {
        return this.$store.state.query;
      },
    },
  },
};
</script>

<style scoped>
</style>