<template>
  <v-app>
    <div>
      <MenuPanel />

      <router-view />
    </div>
  </v-app>
</template>

<script>
import MenuPanel from "./components/menu_panel.vue";
export default {
  name: "App",
  components: { MenuPanel },
};
</script>

<style>
</style>