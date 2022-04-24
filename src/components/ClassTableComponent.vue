<template>
  <v-container>
    <v-calendar
      ref="calendar"
      :now="today"
      :value="today"
      :events="events"
      color="primary"
      type="week"
    ></v-calendar>
  </v-container>
</template>

<script>
export default {
  name: "ClassTableComponent",
  props: ["events"],
    data: () => ({
    today: "2019-01-08",
    
  }),
};
</script>

<style>
</style>