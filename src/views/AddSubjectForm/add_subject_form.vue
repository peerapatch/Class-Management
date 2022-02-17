<template>
 
</template>

<script>
export default {
  name: "AddSubjectForm",
  methods: {
    addnewSubject() {
      this.$store.state.subjects.push({
        code: this.code,
        name: this.name,
        credit: this.credit,
        sect: this.sect,
        cap: this.cap,
        lect: this.lect,
        maj: this.maj,
      });
    },
  },
  data() {
    return {
      code: "",
      name: "",
      credit: "",
      sect: "",
      cap: "",
      lect: "",
      maj: "",
    };
  },
};
</script>

