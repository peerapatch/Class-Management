<template>
  <v-container class="d-flex flex-column">
    <v-container class="d-flex flex-row">
      <v-spacer />
      <AddSubjectForm @createSubject="createSubject($event)" />
    </v-container>
    <!-- {{ subjects }} -->
    <v-data-table
      :headers="headers"
      :items="subjects"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="viewDetail(item)"> mdi-eye</v-icon>
        <v-icon @click="openDeleteDialog(item)" class="red--text">
          mdi-delete</v-icon
        >
      </template>
    </v-data-table>

    <v-dialog v-model="isDeleteDialogOn" persistent>
      <v-card>
        <v-card-title
          >Delete {{ selected_item.subject_code }} -
          {{ selected_item.subject_name }}</v-card-title
        >
        <v-card-text>Are you sure to delete this subject?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            plain
            width="125"
            class="red white--text"
            @click="delete_subject()"
            >Delete</v-btn
          >
          <v-btn plain width="125" @click="closeDeleteDialog()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isViewDetailOn" persistent>
      <v-card elevation="0">
        <v-card-title
          >{{ selected_item.subject_code }} -
          {{ selected_item.subject_name }}</v-card-title
        >
        <v-container
          class="px-4 py-4 mx-4 my-4 grey lighten-2 d-flex flex-column"
        >
          <!-- {{ selected_item }} -->
          <v-container><b>Lecturer : </b> {{ selected_item.lecturer }}</v-container>
          
          <v-container
            ><b>Faculty : </b> {{ selected_item.faculty }}</v-container
          >
          <v-container><b>Major : </b> {{ selected_item.major }}</v-container>
          <v-container><b>Section : </b> {{ selected_item.section }}</v-container>
          <v-container><b>Credits : </b> {{ selected_item.credit }}</v-container>
          <v-container><b>Capacity : </b> {{ selected_item.capacity }}</v-container>
          <v-container><b>Remark : </b> {{ selected_item.remark }}</v-container>

          <v-container
            v-for="(item, index) in selected_item.period"
            :key="item"
          >
            <v-container>
              <b class="pr-10">Period {{ index + 1 }}</b>
              <b class="pr-5">{{ item.weekday }}</b>
              {{ item.start }} - {{ item.finish }}
              <v-spacer/>
              <b>Room.</b> {{ item.room }}
            </v-container>
          </v-container>
          
        </v-container>

        <v-card-actions>
          <v-spacer />

          <v-btn plain width="125" @click="closeView()">Cancel</v-btn>
          <!-- <v-btn width="150" color="red" class="white--text" @click="closeView()" >Cancel</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import AddSubjectForm from "../views/AddSubjectForm/add_subject_form.vue";
import { deleteSubject } from "../modules/fetch";
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

    openDeleteDialog(item) {
      this.isDeleteDialogOn = true;
      this.selected_item = item;
    },

    closeDeleteDialog() {
      this.isDeleteDialogOn = false;
      this.selected_item = {};
    },

    async delete_subject() {
      let res = await deleteSubject(this.selected_item._id);
      console.log(res);
      this.isDeleteDialogOn = false;
      this.$store.dispatch("getAllSubject");
      this.selected_item = {};
    },

    viewDetail(item) {
      this.selected_item = item;
      this.isViewDetailOn = true;
    },

    closeView() {
      this.isViewDetailOn = false;
    },
  },

  data() {
    return {
      isViewDetailOn: false,
      isDeleteDialogOn: false,
      selected_item: {},
      headers: [
        {
          text: "Code",
          align: "start",
          value: "subject_code",
        },
        { text: "Name", value: "subject_name" },
        { text: "Lecturer", value: "lecturer" },
        { text: "Major", value: "major", sortable: true },
        { text: "Faculty", value: "faculty", sortable: true },
        { text: "Section", value: "section" },
        { text: "Credit", value: "credit" },
        { text: "Action", value: "actions" },
      ],
    };
  },
};
</script>

<style>
</style>