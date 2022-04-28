<template>
  <v-app>
    <div>
      <MenuPanel />
    </div>
    <router-view />
  </v-app>
</template>

<script>
import MenuPanel from "./components/menu_panel.vue";
// import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",

  created() {
    this.$store.dispatch("getAllMajor");
    this.$store.dispatch("getAllRoom");
    this.$store.dispatch("getAllSubject");
    this.$store.dispatch("getAllLecturers");
  },
  components: { MenuPanel },

  data() {
    return {
      trigger: 0,
    };
  },
};
</script>

<style>
</style>