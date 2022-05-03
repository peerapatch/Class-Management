<template>
  <v-container>
    TEST
    <slot></slot>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["action"],
  methods: {
    showAlert() {
      console.log("TEST");
      alert("Hello World From Child");
    },
  },
};
</script>
