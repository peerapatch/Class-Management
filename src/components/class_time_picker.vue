<template>
  <v-container>
    <v-btn color="blue" class="white--text" @click="passEvent">{{ text }}</v-btn>
    <v-dialog v-model="isDialogOpen" width="300">
      <v-time-picker v-model="time" format="24hr" dark> </v-time-picker>
      <v-btn @click="onCloseDialog">Close</v-btn>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: "ClassTimePicker",
  data() {
    
    return {
      isDialogOpen: false,
      time: "",
    };
  },
  props : ["text"],
  methods: {
    onCloseDialog() {
      (this.isDialogOpen = false), console.log("close dialog");
      this.$emit("selectTime", this.time);
    },
    passEvent() {
      this.isDialogOpen = !this.isDialogOpen;
    },
  },
};
</script>

<style>
</style>