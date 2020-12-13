import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    kanban: [[]],
    id: 0
  },
  getters: {
    kanbanData: state => state.kanban,
    id: state => state.id
  },
  mutations: {
    incrementId: state => {
      state.id++;
    },
    addColumn: state => {
      state.kanban = [...state.kanban, []];
    },
    addCard: (state, { content, columnIndex }) => {
      state.kanban[columnIndex].push({
        content: content,
        id: state.id
      });
    },
    deleteColumn: (state, payload) => {
      state.kanban = state.kanban.filter((card, index) => index !== payload);
    },
    deleteCard: (state, { cardIndex, columnIndex }) => {
      state.kanban[columnIndex].splice(cardIndex, 1);
    },
    ordenedCards: (state, { column, columnIndex }) => {
      Vue.set(state.kanban, columnIndex, column);
    }
  },
  actions: {
    orderByAsc({ commit, state }, columnIndex) {
      const column = state.kanban[columnIndex].sort((a, b) => {
        if (a.id < b.id) {
          return 1;
        }
        if (a.id > b.id) {
          return -1;
        }
        return 0;
      });

      commit("ordenedCards", { column, columnIndex });
    },
    orderByDesc({ commit, state }, columnIndex) {
      const column = state.kanban[columnIndex].sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });

      commit("ordenedCards", { column, columnIndex });
    }
  },
  modules: {}
});
