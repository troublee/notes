<template>
  <v-card
    class="mx-auto"
    max-width="500"
    max-height='100%'
  >
    <v-card-title>
      <v-text-field
        clearable
        clear-icon='mdi-close'
        flat
        hide-details
        label="Search the note..."
        prepend-inner-icon="mdi-magnify"
        solo
        v-model='search'
      ></v-text-field>
      <v-btn text color='primary' @click='handleRouteNewNote'>New note</v-btn>
    </v-card-title>
    <v-list
      three-line
      color='grey lighten-5'
      max-height='500'
      class='d-flex flex-column list'
      subheader
    >
      <v-list-item
        v-for="(note, i) in filterNotes(notes)"
        :key="i"
        class='d-flex align-center note'
        :class='{ "order-first pinned": note.pinned }'
        @click='handleRouteEditNote(note, i)'
      >
        <v-list-item-content>
          <v-list-item-title v-text="note.text"></v-list-item-title>
          <v-list-item-subtitle>
            <v-chip-group multiple mandatory color='primary' :value='note.tags'>
              <v-chip v-for="tag in note.tags" :key="tag" disabled>{{tag}}</v-chip>
            </v-chip-group>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon class='icon'>
          <v-btn small
            icon
            color='error'
            @click.stop='deleteNote(i)'
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn small
            icon
            :color='note.pinned ? "primary" : ""'
            @click.stop='togglePin(note)'
          >
            <v-icon v-if='note.pinned'>mdi-pin-off</v-icon>
            <v-icon v-else>mdi-pin</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>

export default {
  data: () => {
    return {
      search: ''
    }
  },
  methods: {
    togglePin (note) {
      setTimeout(_ => {
        if (note.pinned) {
          note.pinned = false
        } else {
          const pinnedNote = this.notes.find(el => el.pinned)
          if (pinnedNote) pinnedNote.pinned = false
          note.pinned = true
        }
      }, 300)
    },
    filterNotes (notes) {
      if (this.search && this.notes) {
        const filteredNotes = this.notes.filter(note => {
          const text = note.text.toLowerCase()
          const tags = note.tags.map(el => el.toLowerCase())
          const searchByTags = () => {
            const search = this.search.toLowerCase().split(' ')
            const searchResults = []
            search.forEach(item => {
              searchResults.push(tags.some(el => el.includes(item)))
            })
            return searchResults.includes(false) ? 0 : 1
          }
          return text.includes(this.search.toLowerCase()) || searchByTags()
        })
        return filteredNotes
      }
      return notes
    },
    handleRouteNewNote () {
      this.$router.push('/note/new')
    },
    handleRouteEditNote (note, idx) {
      this.$router.push({ name: 'Note', params: { id: idx + 1, noteToEdit: note } })
    },
    deleteNote (idx) {
      this.$store.dispatch('toggleDialog', {
        show: true,
        text: 'Are you sure you want to delete this note?',
        action: { name: 'deleteNote', payload: idx }
      })
    }
  },
  computed: {
    notes () {
      return this.$store.getters.notes
    }
  }
}
</script>

<style scoped>
.list {
  position: relative;
  overflow-y: auto;
}
.pinned {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #eee;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2);
}
.icon {
  margin: auto;
}
.card-title {
  display: flex;
  align-items: center;
  padding: 0 12px;
}
.note {
  cursor: pointer;
}
.note:hover {
 border: 1px solid #BBDEFB;
}
</style>
<style>
.v-input__slot {
  padding-left: 0 !important;
  background: transparent !important;
}
.list {
  padding-bottom: 0 !important;
}
[role=combobox] .v-input__append-inner {
  display: none !important;
}
</style>
