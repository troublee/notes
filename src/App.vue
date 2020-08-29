<template>
<v-app>
  <v-app-bar app color='indigo darken-4' dark dense>
    <v-toolbar-title @click='handleRouteHome' class="title">Notes</v-toolbar-title>
  </v-app-bar>
  <v-main>
    <v-container fluid>
      <router-view />
    </v-container>
  </v-main>
  <Dialog />
</v-app>
</template>

<script>
import Dialog from './components/Dialog'

export default {
  name: 'App',
  components: {
    Dialog
  },

  data: () => ({
  }),
  methods: {
    handleRouteHome () {
      this.$router.push('/')
    }
  },
  mounted () {
    if (!this.$store.getters.notes.length) {
      this.$store.dispatch('getNotes')
    }
  }
}
</script>

<style scoped>
.title {
  cursor: pointer;
}
.title:hover {
  color: #3F51B5;
}
</style>
