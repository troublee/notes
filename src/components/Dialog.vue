<template>
  <v-dialog v-model="dialog.show" persistent max-width="320" class='dialog'>
    <v-card>
      <v-card-title class="headline">
        <p>{{dialog.text}}</p>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="toggleDialog(false, null)">cancel</v-btn>
        <v-btn color="error" text @click="confirmAction">confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {
    confirmAction () {
      if (this.dialog.action) this.$store.dispatch(this.dialog.action.name, this.dialog.action.payload)
      else this.$router.go(-1)
      this.toggleDialog(false, null)
    },
    toggleDialog (show, text) {
      this.$store.dispatch('toggleDialog', { show, text })
    }
  },
  computed: {
    dialog () {
      return this.$store.getters.dialog
    }
  }
}
</script>
