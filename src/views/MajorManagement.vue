<template>
  <v-container>
    <!-- {{ defaultFaculty }}
    {{ selected }} -->
    <v-container class="d-flex">
      <v-spacer></v-spacer>
      <v-btn width="200" class="green white--text" elevation="0" @click="isCreateDialogOpen = !isCreateDialogOpen">Add Major</v-btn>
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="majors"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="editMajor(item)"> mdi-pencil</v-icon>
          <v-icon @click="deleteMajor(item)" class="red--text">
            mdi-delete</v-icon
          >
        </template>
      </v-data-table>
    </v-container>
    <v-dialog v-model="isCreateDialogOpen" persistent>

      <v-card>
        <v-card-title>Create Major</v-card-title>
      <v-container class="mx-5 my-3">
          <v-select
            v-model="defaultFaculty"
            :items="faculty"
            item-text="title"
            return-object
          >
          </v-select>
          <v-text-field v-model="major" label="Major" />
          <v-text-field v-model="year" label="Year" />
        </v-container>

        <v-card-actions>
          <v-spacer />
          <v-btn width="150" color="green" class="white--text" @click="createNewMajor" >Confirm</v-btn>
          <v-btn @click="dialogCancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete dialog -->

    <v-dialog v-model="isDeleteDialogOpen">
      <v-card>
        <v-card-title>Delete Major?</v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="red" class="white--text" @click="confirmDelete">Delete</v-btn>
          <v-btn @click="cancelDelete">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isEditDialogOpen" persistent>
      <v-card>
        <v-card-title>Edit Major</v-card-title>

        <v-container>
          <v-select
            v-model="selected.faculty"
            :items="faculty"
            item-text="title"
            return-object
          >
          </v-select>
          <v-text-field v-model="selected.major"></v-text-field>
          <v-text-field v-model="selected.year"></v-text-field>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn width="150" color="green" class="white--text" @click="editConfirm" >Save Changes</v-btn>
          <v-btn @click="editCancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {
  createNewMajor,
  getAllMajor,
  deleteMajor,
  editMajor,
} from "../modules/fetch";
import { mapState } from "vuex";
export default {
  name: "MajorManagement",
  created() {
    this.fetchMajor();
  },
  computed: {
    ...mapState({
      majors : (state) => state.majors
    })
  },

  data() {
    return {
      headers: [
        { text: "Faculty", value: "faculty" },
        { text: "Major", value: "major" },
        { text: "Years", value: "year" },
        { text: "Action", value: "actions" },
      ],
      majorData: [],
      isCreateDialogOpen: false,
      isDeleteDialogOpen: false,
      isEditDialogOpen: false,
      defaultFaculty: { id: 0, title: "CoC" },
      major: "-",
      year: "2565",

      faculty: [
        { id: 0, title: "CoC" },
        { id: 1, title: "FIS" },
        { id: 2, title: "FHT" },
        { id: 3, title: "TE" },
      ],
      selected: {},
    };
  },
  methods: {
    async fetchMajor() {
      let res = await getAllMajor();
      this.majorData = res.users;
    },
    reset() {
      (this.defaultFaculty = { id: 0, title: "CoC" }),
        (this.major = "-"),
        (this.year = "2565");
    },
    dialogCancel() {
      this.reset();
      this.isCreateDialogOpen = false;
    },
    async createNewMajor() {
      console.log(this.defaultFaculty.title);
      let res = await createNewMajor({
        faculty: this.defaultFaculty.title,
        major: this.major,
        year: this.year,
      });
      console.log(res);
      this.reset();
      this.isCreateDialogOpen = false;
      this.$store.dispatch('getAllMajor')
    },

    deleteMajor(item) {
      this.selected = item;
      this.isDeleteDialogOpen = true;
      this.$store.dispatch('getAllMajor')
    },
    async confirmDelete() {
      let res = await deleteMajor(this.selected._id);

      console.log(res);

      this.isDeleteDialogOpen = false;
      this.selected = {};
      this.$store.dispatch('getAllMajor')
    },

    async cancelDelete() {
      this.selected = {};
      this.isDeleteDialogOpen = false;
    },

    editMajor(item) {
      // console.log('test' , item)
      this.isEditDialogOpen = true;
      this.selected = item;
    },
    async editConfirm() {
      await editMajor(this.selected._id, this.selected);
      this.isEditDialogOpen = false;
      this.selected = {};
      this.$store.dispatch('getAllMajor')
    },
    async editCancel() {
      this.isEditDialogOpen = false;
      this.selected = {};
    },
  },
};
</script>

<style>
</style>