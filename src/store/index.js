import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    dialog: {
      show: false,
      text: null,
      action: null
    }
  },
  mutations: {
    addNote (state, payload) {
      state.notes.push(payload)
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    deleteNote (state, payload) {
      state.notes.splice(payload, 1)
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    editNote (state, payload) {
      state.notes[payload.idx] = payload.note
      localStorage.setItem('notes', JSON.stringify(state.notes))
    },
    setNotes (state, payload) {
      state.notes = payload
    },
    toggleDialog (state, payload) {
      state.dialog = payload
    }
  },
  actions: {
    addNote ({ commit }, payload) {
      setTimeout(_ => {
        commit('addNote', payload)
      }, 300)
    },
    deleteNote ({ commit }, payload) {
      setTimeout(() => {
        commit('deleteNote', payload)
      }, 300)
    },
    editNote ({ commit }, payload) {
      setTimeout(() => {
        commit('editNote', payload)
      }, 300)
    },
    getNotes ({ commit }) {
      setTimeout(() => {
        commit('setNotes', JSON.parse(localStorage.getItem('notes')))
      }, 300)
    },
    toggleDialog ({ commit }, payload) {
      commit('toggleDialog', payload)
    }
  },
  getters: {
    notes: state => state.notes,
    dialog: state => state.dialog
  }
})
