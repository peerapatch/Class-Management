<template>
  <v-container fluid>
  
    <v-calendar
      ref="calendar"
      :value="today"
      :events="events"
      color="primary"
      type="week"
      @click:event="showEvent"
    ></v-calendar>
    <v-dialog v-model="isDialogOpen" max-width="1000">
      <v-sheet>
        <v-container class="pa-10">
          <div class="font-weight-bold">
            {{ temp.name }} - ({{ temp.faculty }} {{ temp.yrs }})
          </div>
          <div class="font-weight-bold py-2">{{ temp.room }}</div>
        </v-container>
      </v-sheet>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "ClassTableComponent",
  props: ["events"],
  data: () => ({
    today: "2019-01-08",

    isDialogOpen: false,
    temp: {},
  }),

  methods: {
    onClose() {
      console.log("close");
    },
    showEvent({ event }) {
      this.isDialogOpen = true;
      console.log(event);
      this.temp = event;
    },
  },
};
</script>

<style >
.v-calendar-daily_head-day-label {
  display: none;
}
</style>