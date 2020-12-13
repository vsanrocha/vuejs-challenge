<template>
  <draggable
    :list="column"
    group="column"
    class="cards-group"
    ghost-class="ghost"
  >
    <v-col
      v-for="(card, cardIndex) in column"
      :key="cardIndex"
      @mouseover="showDeleteBtn(cardIndex)"
      @mouseleave="currentCardIndex = undefined"
    >
      <v-card>
        <v-card-title cols="12">
          <span>#</span>
          <strong>{{ card.id }}</strong>
        </v-card-title>
        <v-card-text class="d-flex align-center">
          <span class="my-3">
            {{ card.content }}
          </span>
          <v-spacer />
          <v-btn
            icon
            color="red lighten-1"
            @click="deleteCard(cardIndex)"
            v-if="currentCardIndex === cardIndex"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Cards",
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
    draggable
  },
  data: () => ({
    currentCardIndex: undefined
  }),
  methods: {
    showDeleteBtn(index) {
      this.currentCardIndex = index;
    },
    deleteCard(cardIndex) {
      this.$store.commit("deleteCard", {
        cardIndex,
        columnIndex: this.columnIndex
      });
    }
  }
};
</script>
