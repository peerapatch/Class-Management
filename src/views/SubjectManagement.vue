<template>
  <v-container class="d-flex flex-column">
    <v-container class="d-flex flex-row">
      <v-spacer />
      <AddSubjectForm @createSubject="createSubject($event)" />
    </v-container>
{{ subjects }}
    <v-data-table
      :headers="headers"
      :items="subjects"
      :items-per-page="5"
      class="elevation-1"
    >
      <!-- <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="viewClassRoom(item)"> mdi-eye</v-icon>
        <v-icon @click="editClassRoom(item)"> mdi-pencil</v-icon>
        <v-icon @click="deleteClassRoom(item)" class="red--text">
          mdi-delete</v-icon
        >
      </template> -->
    </v-data-table>
  </v-container>
</template>

<script>
import AddSubjectForm from "../views/AddSubjectForm/add_subject_form.vue";
import { mapState } from "vuex";
export default {
  name: "SubjectManagement",
  components: { AddSubjectForm },
  computed: {
    ...mapState({
      subjects: (state) => state.subjects,
    }),
  },
  methods: {
    createSubject(event_value) {
      console.log(event_value);
    },
  },

  data() {
    return {
      headers: [
        {
          text: "Code",
          align: "start",
          value: "subject_code",
        },

        { text: "Name", value: "subject_name" },
        { text: "Major", value: "major", sortable: true },
        { text: "Faculty", value: "faculty", sortable: true },
        { text: "Section", value: "section" },
        { text: "Credit", value: "credit" },
      ],
    };
  },
};
</script>

<style>
</style>