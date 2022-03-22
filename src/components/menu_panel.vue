<template>
  <v-toolbar elevation="0" color="grey lighten-3">
    <v-spacer />
    <v-toolbar-items>
      <v-btn plain @click="goTo('/classroom')">Classroom</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn plain @click="goTo('/lecturer')">Lecturer</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn plain @click="goTo('/major')">Major</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn plain @click="goTo('/subject')">Subjects</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "MenuPanel",
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style>
</style>