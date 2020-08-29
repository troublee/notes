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
        solo
        hide-details
        label="Title"
        v-model='note.title'
      ></v-text-field>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle>
      <v-textarea
        auto-grow
        dense
        rows='3'
        clearable
        clear-icon='mdi-close'
        flat
        hide-details
        label="Text"
        v-model='note.text'
      ></v-textarea>
    </v-card-subtitle>
      <v-card-text>
        <v-combobox
          v-model="note.tags"
          deletable-chips
          chips
          small-chips
          label="Tags"
          dense
          flat
          multiple
          height='100px'
        >
        </v-combobox>
      </v-card-text>
      <v-card-actions class='d-flex justify-end'>
        <v-btn text color='error' @click='toggleDialog'>cancel</v-btn>
        <v-btn text color='primary' @click='saveNote'>save</v-btn>
      </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['noteToEdit'],
  data: () => {
    return {
      newNote: {
        title: '',
        text: '',
        pinned: false,
        tags: []
      }
    }
  },
  computed: {
    note () {
      return this.noteToEdit ? this.noteToEdit : this.newNote
    }
  },
  methods: {
    handleRouteBack () {
      this.$router.go(-1)
    },
    saveNote () {
      if (this.noteToEdit) this.$store.dispatch('editNote', { note: this.note, idx: this.$route.params.id - 1 })
      else this.$store.dispatch('addNote', this.note)
      this.$router.push('/')
    },
    toggleDialog () {
      this.$store.dispatch('toggleDialog', { show: true, text: 'Are you sure you want to discard changes?' })
    }
  }
}
</script>

<style scoped>
.list {
  position: relative;
  overflow-y: auto;
}
.icon {
  margin: auto;
}
.card-title {
  display: flex;
  align-items: center;
  padding: 0 12px;
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
