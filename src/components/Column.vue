<template>
  <v-card width="300" height="80vh" class="ma-2">
    <v-toolbar dense>
      <v-btn icon tile @click="showAddCard = !showAddCard">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn icon small @click="orderCardsDesc">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn icon small @click="orderCardsAsc">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container v-if="showAddCard">
      <v-row>
        <v-col cols="8">
          <v-text-field v-model="cardContent" />
        </v-col>
        <v-col cols="4">
          <v-btn color="primary" @click="addCard">
            Add
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <Card :column="column" :columnIndex="columnIndex" />

    <v-card-actions>
      <v-spacer />
      <v-btn color="red lighten-1" icon tile @click="deleteColumn()">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Card from "./Card.vue";

export default {
  name: "Kanban",
  props: {
    column: {
      type: Array,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  components: {
    Card
  },

  data: () => ({
    cardContent: "",
    showAddCard: false
  }),

  methods: {
    addColumn() {
      console.log(this.columns);
      this.columns.push([]);
    },
    addCard() {
      this.$store.commit("addCard", {
        content: this.cardContent,
        columnIndex: this.columnIndex
      });
      this.$store.commit("incrementId");
      this.showAddCard = false;
      this.cardContent = "";
    },
    deleteColumn() {
      this.$store.commit("deleteColumn", this.columnIndex);
    },
    orderCardsAsc() {
      this.$store.dispatch("orderByAsc", this.columnIndex);
    },
    orderCardsDesc() {
      this.$store.dispatch("orderByDesc", this.columnIndex);
    }
  }
};
</script>

<style lang="scss">
.cards-group {
  height: 87%;
  overflow-x: auto;
}
</style>
