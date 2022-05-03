<template>
  <v-container class="grey lighten-4">
    <!-- {{ result_lecturers }} -->

    <!-- {{ form }} -->
    <v-container class="d-flex">
      <v-spacer />
      <v-btn
        width="200"
        color="green"
        class="white--text"
        elevation="0"
        @click="isDialogOpen = !isDialogOpen"
        >Add New Lecturer</v-btn
      >
    </v-container>

    <v-data-table
      v-if="!isLoading"
      :headers="headers"
      :items="lecturers"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="viewLecturer(item)"> mdi-eye</v-icon>
        <v-icon @click="editLecturer(item)"> mdi-pencil</v-icon>
        <v-icon @click="deleteLecturer(item)" class="red--text">
          mdi-delete</v-icon
        >
      </template>
    </v-data-table>

    <v-container v-else class="d-flex">
      <v-spacer />
      <div class="lds-dual-ring"></div>
      <v-spacer />
    </v-container>

    <v-dialog v-model="isDialogOpen" max-width="800">
      <v-card elevation="0">
        <v-card-title>Add New Lecturer</v-card-title>
        <v-container>
          <v-row>
            <v-col
              ><v-text-field label="Name" v-model="form.first_name"
            /></v-col>
            <v-col
              ><v-text-field label="Last Name" v-model="form.last_name"
            /></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                label="Faculty"
                :items="faculty"
                v-model="form.faculty"
              />
            </v-col>
            <v-col />
          </v-row>
          <!-- {{ form.type }} -->
          <v-row>
            <v-col>
              <v-select
                label="Lecturer Types"
                :items="lecturerTypes"
                item-text="name"
                item-value="id"
                v-model="form.type"
                return-object
              />
            </v-col>
            <v-col />
          </v-row>
          <v-divider />
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn
            width="150"
            color="green"
            class="white--text"
            @click="addNewOne"
            >Confirm</v-btn
          >
          <v-btn width="150" @click="isDialogOpen = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isDeleteDialogOpen">
      <v-card>
        <v-card-title>Delete this Lecturer</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            width="150"
            color="red"
            class="white--text"
            @click="confirmDelete"
            >Delete</v-btn
          >
          <v-btn
            width="150"
            color="grey"
            class="white--text"
            @click="isDeleteDialogOpen = !isDeleteDialogOpen"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isEditDialogOpen" persistent fullscreen>
      <v-card>
        <v-card-title>Edit this Lecturer</v-card-title>
        <!-- {{ temp_lecturer.type }} -->
        <v-container class="px-10">
          <v-text-field v-model="temp_lecturer.name" />

          <v-select
            label="Faculty"
            :items="faculty"
            v-model="temp_lecturer.faculty"
          ></v-select>
          <v-select
            label="Type"
            :items="lecturerTypes"
            item-text="name"
            item-value="id"
            v-model="temp_lecturer.type"
            return-object
          ></v-select>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn
            width="150"
            color="green"
            class="white--text"
            @click="confirmEdit"
            >Save Changes</v-btn
          >
          <v-btn
            width="150"
            color="grey"
            class="white--text"
            @click="closeEditDialog"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isViewedDialogOpen">
      <v-card class="pa-10">
        <v-container fluid>
          <div class="py-8">
            <h1>{{ temp_lecturer.name }} </h1>
          </div>
        </v-container>
        <class-table-component :events="result" />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {
  getAllLecturers,
  addNewLecturer,
  deleteLecturer,
  editLecturer,
} from "../modules/fetch";
import ClassTableComponent from "../components/ClassTableComponent.vue";
export default {
  created() {
    this.getLecturers();
  },

  components: { ClassTableComponent },
  name: "LecturerManagement",
  data() {
    return {
      viewLectureSubjects: [],
      temp_id: "",
      temp_lecturer: { id: "", name: "", faculty: "", type: {} },
      temp_type: {},
      edit_form: { id: "", name: "", faculty: "", type: "" },
      isViewedDialogOpen: false,
      isDeleteDialogOpen: false,
      isEditDialogOpen: false,
      isLoading: true,
      result_lecturers: [],
      form: {
        first_name: "",
        last_name: "",
        faculty: "CoC",
        type: {
          id: 0,
          name: "Regular",
        },
      },
      //   lecturers: [],
      isDialogOpen: false,

      lecturerTypes: [
        {
          id: 0,
          name: "Regular",
        },
        {
          id: 1,
          name: "Specialist",
        },
      ],
      faculty: ["CoC", "FIS", "FHT", "TE"],
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Faculty", value: "faculty" },
        { text: "Type", value: "type_name" },
        { text: "Action", value: "actions" },
      ],

      table_data: [],
    };
  },

  methods: {
    async getLecturers() {
      let result = await getAllLecturers();
      console.log(result);
      this.result_lecturers = result;
      this.isLoading = false;
    },

    async addNewOne() {
      let result = await addNewLecturer(this.form);
      this.form = {
        first_name: "",
        last_name: "",
        faculty: "CoC",
        type: {
          id: 0,
          name: "Regular",
        },
      };
      console.log(result);

      if (result === true) {
        this.getLecturers();
        this.isDialogOpen = false;
      }
    },

    async deleteLecturer(item) {
      this.isDeleteDialogOpen = true;
      console.log("delete", item);

      this.temp_id = item.id;
    },
    async confirmDelete() {
      let res = await deleteLecturer(this.temp_id);
      if (res === true) {
        this.getLecturers();
        this.temp_id = "";

        this.isDeleteDialogOpen = false;
      }
    },
    async viewLecturer(item) {
      console.log(item);
      this.viewLectureSubjects = this.$store.getters.getSubjectsByLecturer(
        item.name
      );
      this.isViewedDialogOpen = true;
      this.temp_lecturer = item;
    },
    async editLecturer(item) {
      console.log(item);
      this.isEditDialogOpen = true;
      this.temp_lecturer = item;
    },
    async confirmEdit() {
      let result = await editLecturer(
        this.temp_lecturer.id,
        this.temp_lecturer
      );
      if (result === true) {
        this.getLecturers();
        this.isEditDialogOpen = false;
      }
    },
    closeEditDialog() {
      this.getLecturers();
      this.isEditDialogOpen = false;
    },

    getDayInt(val) {
      if (val === "Sun") return "06";
      if (val === "Mon") return "07";
      if (val === "Tue") return "08";
      if (val === "Wed") return "09";
      if (val === "Thu") return "10";
      if (val === "Fri") return "11";
      if (val === "Sat") return "12";
    },
  },
  computed: {
    result() {
      let new_array_result = [];
      this.viewLectureSubjects.forEach((element_lv1) => {
        element_lv1.period.forEach((element_lv2) => {
          if (element_lv2.start !== "0:00" && element_lv2.finish !== "0:00") {
            new_array_result.push({
              code: element_lv1.subject_code,
              name:
                element_lv1.subject_code +
                " " +
                element_lv1.subject_name +
                " " +
                element_lv2.room,
              yrs: 65,
              
              faculty: element_lv1.faculty,
              start: `2019-01-${this.getDayInt(element_lv2.weekday)} ${
                element_lv2.start
              }`,
              end: `2019-01-${this.getDayInt(element_lv2.weekday)} ${
                element_lv2.finish
              }`,
            });
          }
        });
      });

      console.log(new_array_result);
      return new_array_result;
    },
    lecturers() {
      console.log("computed ", this.result_lecturers);
      let result = this.result_lecturers.map((item) => ({
        id: item._id,
        name: item.first_name + " " + item.last_name,
        faculty: item.faculty,
        type: item.type,
        type_name: item.type == 0 ? "Regular" : "Specialist",
      }));
      console.log(result);
      return result;
    },
  },
};
</script>

<style>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(94, 94, 94);
  border-color: rgb(94, 94, 94) transparent rgb(94, 94, 94) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
