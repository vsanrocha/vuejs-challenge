<template>
  <v-container>
    <v-row class="board">
      <draggable :list="kanbanData" group="kanban" class="d-flex">
        <div v-for="(column, index) in kanbanData" :key="index">
          <Column :column="column" :columnIndex="index" />
        </div>

        <v-btn
          class="mx-2 align-self-center"
          fab
          dark
          color="indigo"
          @click="commitAddColumn"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </draggable>
    </v-row>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import { mapGetters } from "vuex";
import Column from "./Column.vue";

export default {
  name: "Kanban",
  components: {
    draggable,
    Column
  },

  computed: {
    ...mapGetters(["kanbanData"])
  },

  data: () => ({
    id: 0,
    cardContent: ""
  }),

  methods: {
    commitAddColumn() {
      this.$store.commit("addColumn");
    }
  }
};
</script>

<style lang="scss">
.board {
  overflow-y: auto;
}
</style>
