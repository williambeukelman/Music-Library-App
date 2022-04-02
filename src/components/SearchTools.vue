<template>
  <div class="row bg-transparent">
    <div class="col d-flex gap-2 py-1 justify-content-end">
      <transition-group name="tools">
        <template v-for="tool in tools" :key="tool">
          <div v-if="tab.includes(tool.requires)" :class="tool.visible">
            <input
              type="radio"
              class="btn-check"
              :value="tool.name"
              :name="tool.name"
              :id="'btn-' + tool.name"
              @click="reverse(tool.name)"
              v-model="sortOption"
              autocomplete="off"
            />
            <label class="btn btn-outline-dark" :for="'btn-' + tool.name"
              >{{ tool.label }}
              <span
                class="icon"
                v-html="require('../assets/' + tool.icon)"
              ></span
            ></label>
          </div>
        </template>
      </transition-group>
      <button class="btn btn-dark text-uppercase d-none" type="button">
        Filter
        <span class="icon" v-html="require('../assets/filter.svg')"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchTools",
  methods: {
    reverse(tool) {
      if (tool.includes("_reverse")) {
        this.tools[tool].visible = "hidden";
        let orig = tool.split("_")[0];
        this.tools[orig].visible = "";
      } else {
        this.tools[tool].visible = "hidden";
        this.tools[tool + "_reverse"].visible = "";
      }
    },
  },
  data() {
    return {
      tools: {
        alphabetical: {
          name: "alphabetical",
          label: "Alphabetical",
          requires: "",
          visible: "",
          icon: "sort-up.svg",
        },
        alphabetical_reverse: {
          name: "alphabetical_reverse",
          label: "Alphabetical",
          requires: "",
          visible: "hidden",
          icon: "sort-down.svg",
        },
        date: {
          name: "date",
          label: "Date",
          requires: "Albums",
          visible: "",
          icon: "sort-up.svg",
        },
        date_reverse: {
          name: "date_reverse",
          label: "Date",
          requires: "Albums",
          visible: "hidden",
          icon: "sort-down.svg",
        },
        duration: {
          name: "duration",
          label: "Duration",
          requires: "Songs",
          visible: "",
          icon: "sort-up.svg",
        },
        duration_reverse: {
          name: "duration_reverse",
          label: "Duration",
          requires: "Songs",
          visible: "hidden",
          icon: "sort-down.svg",
        },
      },
    };
  },
  computed: {
    tab() {
      return this.$store.state.tab;
    },
    sortOption: {
      get() {
        return this.$store.state.sortMethod;
      },
      set(value) {
        this.$store.commit("sort", value);
      },
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
.tools-enter-active,
.tools-leave-active {
  transition: all 0.4s ease;
}
.tools-enter-from,
.tools-leave-to {
  opacity: 0;
  transform: translateX(5rem);
}
</style>