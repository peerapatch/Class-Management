<template>
  <v-toolbar elevation="0" dark>
    <v-toolbar-items>
      <v-btn plain @click="goTo('/')">Time Table</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn plain @click="goTo('/subject_by_classroom')">Subject By Room</v-btn>
    </v-toolbar-items>
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
      this.$router.replace(path);
    },
  },
};
</script>

<style>
</style>