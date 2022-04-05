<template>
  <v-container>
    <!-- {{ subjectList }} -->
    {{ maj }}
    <v-container class="d-flex flex-row justify-end">
      <v-btn
        class="green lighten white--text"
        elevation="0"
        width="200"
        @click="isDialogOn = true"
        >Create New Subject</v-btn
      >
    </v-container>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="subjectList"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon @click="viewSubjectDetail(item)"> mdi-eye</v-icon>
          <v-icon @click="editSubject(item)"> mdi-pencil</v-icon>
          <v-icon @click="deleteSubject(item)" class="red--text">
            mdi-delete</v-icon
          >
        </template>
      </v-data-table>
    </v-container>
    <v-dialog v-model="isDialogOn" max-width="600">
      <v-card>
        <v-card-title>Add Subject</v-card-title>

        <v-container class="px-10">
          <v-text-field
            v-model="code"
            placeholder="Subject Code"
            label="Subject Code"
          />
          <v-text-field
            v-model="name"
            placeholder="Subject Name"
            label="Subject Name"
          />
          <v-text-field
            v-model="credit"
            placeholder="Credits"
            label="Credits"
          />

          <v-row>
            <v-col
              ><v-text-field
                v-model="sect"
                placeholder="Section"
                label="Section"
            /></v-col>
            <v-col>
              <v-text-field
                v-model="cap"
                placeholder="Capacity"
                label="Capacity"
            /></v-col>
          </v-row>

          <!-- <v-text-field
            v-model="lect"
            placeholder="Lecturer"
            label="Lecturer"
          /> -->

          <v-select v-model="lect" placeholder="Lecturer" label="Lecturer" :items="lecturers" ></v-select>


          <!-- <v-text-field v-model="maj" placeholder="Major" label="Major" /> -->
          <v-select v-model="maj" placeholder="Major" label="Major" :items="majors" item-text="major" item-value="major" return-object @change="setLecturer(maj.faculty)"></v-select>
          <b>{{ maj.faculty }}</b>
          <v-container class="d-flex">
            <p class="align-self-center">คาบที่ 1</p>
            <v-spacer />
            <v-text-field
              placeholder="จำนวนชั่วโมง"
              label="จำนวนชั่วโมง"
              v-model="hour_p1"
            />
            <v-spacer />
            <v-radio-group class="d-flex" v-model="period_1_type">
              <v-radio key="0" label="Lecture Room" value="0"></v-radio>
              <v-radio key="1" label="Lab Room" value="1"></v-radio>
            </v-radio-group>
          </v-container>
          <v-container class="d-flex">
            <p class="align-self-center">คาบที่ 2</p>
            <v-spacer />
            <v-text-field
              placeholder="จำนวนชั่วโมง"
              label="จำนวนชั่วโมง"
              v-model="hour_p2"
            />
            <v-spacer />
            <v-radio-group class="d-flex" v-model="period_2_type">
              <v-radio key="0" label="Lecture Room" value="0"></v-radio>
              <v-radio key="1" label="Lab Room" value="1"></v-radio>
            </v-radio-group> </v-container
          ><v-text-field
            placeholder="หมายเหตุ"
            label="หมายเหตุ"
            v-model="remark"
          />
        </v-container>

        <v-divider />
        <v-card-actions class="py-4">
          <v-spacer></v-spacer>
          <v-btn
            width="150"
            class="green lighten-1 white--text"
            @click="addnewSubject"
            >Confirm</v-btn
          >
          <v-btn
            @click="isDialogOn = false"
            width="150"
            class="red lighten-1 white--text"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isEditing">
      <v-card>
        <v-card-title>Edit Data</v-card-title>
        <v-container class="px-10">
          <v-text-field
            v-model="editFormData.code"
            placeholder="Subject Code"
            label="Subject Code"
          />
          <v-text-field
            v-model="editFormData.name"
            placeholder="Subject Name"
            label="Subject Name"
          />
          <v-text-field
            v-model="editFormData.credit"
            placeholder="Credits"
            label="Credits"
          />

          <v-row>
            <v-col
              ><v-text-field
                v-model="editFormData.section"
                placeholder="Section"
                label="Section"
            /></v-col>
            <v-col>
              <v-text-field
                v-model="editFormData.capacity"
                placeholder="Capacity"
                label="Capacity"
            /></v-col>
          </v-row>

          <v-text-field
            v-model="editFormData.lecturer"
            placeholder="Lecturer"
            label="Lecturer"
          />
          <v-text-field
            v-model="editFormData.major"
            placeholder="Major"
            label="Major"
          />
        </v-container>

        <!-- {{ editFormData }} -->

        <v-container class="d-flex">
            <p class="align-self-center">คาบที่ 1</p>
            <v-spacer />
            <v-text-field placeholder="จำนวนชั่วโมง" label="จำนวนชั่วโมง" v-model="editFormData.period[0].hours"/>
            <v-spacer />
            <v-radio-group class="d-flex" v-model="editFormData.period[0].type">
              <v-radio key="0" label="Lecture Room" value="0"></v-radio>
              <v-radio key="1" label="Lab Room" value="1"></v-radio>
            </v-radio-group>
          </v-container>

          <v-container class="d-flex">
            <p class="align-self-center">คาบที่ 2</p>
            <v-spacer />
            <v-text-field placeholder="จำนวนชั่วโมง" label="จำนวนชั่วโมง" v-model="editFormData.period[1].hours"/>
            <v-spacer />
            <v-radio-group class="d-flex" v-model="editFormData.period[1].type">
              <v-radio key="0" label="Lecture Room" value="0"></v-radio>
              <v-radio key="1" label="Lab Room" value="1"></v-radio>
            </v-radio-group> </v-container
          >
          
          <v-container  class="d-flex">
            <v-text-field placeholder="หมายเหตุ" label="หมายเหตุ" v-model="editFormData.remark"/>
          </v-container>

        <v-card-actions class="mx-4">
          <v-spacer />
          <v-btn
            width="125"
            class="green lighten-1 white--text"
            @click="confirmEdit"
            >Confirm</v-btn
          >
          <v-btn
            @click="isEditing = false"
            width="125"
            class="red lighten-1 white--text"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isDeleting">
      <v-card>
        <v-card-title>Delete Subject</v-card-title>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            @click="confirmDelete"
            width="125"
            class="red lighten-1 white--text"
            >Yes</v-btn
          >
          <v-btn @click="isDeleting = false" width="125" class="">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showSubjectDetail">
      <v-card>
        <v-card-title>Subject Detail</v-card-title>

        <v-container class="px-8 py-8">
          <v-row>
            <v-col
              ><h2>{{ selected_subject.code }} {{ selected_subject.name }}</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col>Credit : {{ selected_subject.credit }} </v-col>
          </v-row>
          <v-row>
            <v-col>Section : {{ selected_subject.section }} </v-col>
            <v-col>Capacity : {{ selected_subject.capacity }} </v-col>
          </v-row>
          <v-row>
            <v-col>Lecturer : {{ selected_subject.lecturer }} </v-col>
            <v-col>Major : {{ selected_subject.major }} </v-col>
          </v-row>

          <v-container
            v-for="(item, index) in selected_subject.period"
            :key="item.data"
          >
            <v-row>
              <v-col>
                <b>Period {{ index + 1 }}</b>
              </v-col>
              <v-col> {{ item.hours }} Hrs </v-col>
              <v-col>
                {{ item.type === 0 ? "Lab Room" : "Lecture Room" }}
              </v-col>
            </v-row>
          </v-container>
          <v-row>
            <v-col>หมายเหตุ : {{ selected_subject.remark }} </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn width="150" @click="showSubjectDetail = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import {
  getAllSubject,
  editSubject,
  deleteSubject,
  createNewSubject,
  getAllMajor,
  getLecturerByFaculty
} from "../modules/fetch";
export default {
  created() {
    this.setSubjects();
    this.setMajors();
  },
  name: "SubjectManagement",

  methods: {
    async setMajors() {
      let res = await getAllMajor();
      this.majors = res.users
    },
    async viewSubjectDetail(subject) {
      this.selected_subject = subject;
      this.showSubjectDetail = true;
    },
    async setSubjects() {
      this.subjectList = await getAllSubject();
    },
    editSubject(subject) {
      this.isEditing = true;
      this.editFormData = subject;
      console.log(subject);
    },

    deleteSubject(subject) {
      this.isDeleting = true;
      this.selected_id = subject._id;
    },

    async confirmDelete() {
      await deleteSubject(this.selected_id);
      this.selected_id = null;

      this.isDeleting = false;
      this.setSubjects();
    },
    confirmEdit() {
      editSubject({
        id: this.editFormData._id,
        code: this.editFormData.code,
        name: this.editFormData.name,
        credit: this.editFormData.credit,
        section: this.editFormData.sect,
        capacity: this.editFormData.cap,
        lecturer: this.editFormData.lect,
        major: this.editFormData.maj,
        period : this.editFormData.period,
        remark : this.editFormData.remark,
        classroom: "1234",
      });
      this.isEditing = false;
    },
    async addnewSubject() {
      let form = {
        code: this.code,
        name: this.name,
        credit: this.credit,
        section: this.sect,
        capacity: this.cap,
        lecturer: this.lect,
        major: this.maj.major,
        remark: this.remark,
        period: [
          {
            hours: this.hour_p1,
            type: this.period_1_type,
          },
          {
            hours: this.hour_p2,
            type: this.period_2_type,
          },
        ],
      };
      console.log(form);
      // create

      await createNewSubject(form);
      this.code = "";
      this.name = "";
      this.credit = "";
      this.sect = "";
      this.cap = "";
      this.lect = "";
      this.maj = "";
      (this.remark = ""),
        (this.period_1_type = 0),
        (this.period_2_type = 0),
        (this.hour_p1 = 0);
      this.hour_p2 = 0;
      // (this.isDialogOn = false);

      this.setSubjects();
      this.isDialogOn = false;
    },
   async setLecturer(faculty){
     console.log(faculty)
      let res = await getLecturerByFaculty("Colleage of Computing")
      console.log(res)
    }
  },
  data() {
    return {
      majors : [],
      lecturers : [],
      period_1_type: 0,
      period_2_type: 0,
      hour_p1: 0,
      hour_p2: 0,

      selected_subject: {
        code: "",
        name: "",
        credit: "",
        sect: "",
        cap: "",
        lect: "",
        maj: "",
        period: [],
      },
      showSubjectDetail: false,
      subjectList: [],
      isDialogOn: false,
      isEditing: false,
      isDeleting: false,
      selected_id: null,
      editFormData: {
        id: "",
        code: "",
        name: "",
        credit: "",
        sect: "",
        cap: "",
        lect: "",
        maj: "",
        remark : "",
        period: [
          { hours: "", type: "" },
          { hours: "", type: "" },
        ],
      },

      code: "",
      name: "",
      credit: "",
      sect: "",
      cap: "",
      lect: "",
      maj: "",
      remark: "",
      headers: [
        {
          text: "Code",
          align: "start",
          sortable: false,
          value: "code",
        },
        { text: "Name", value: "name" },
        { text: "Credit", value: "credit" },
        { text: "Section", value: "section" },
        { text: "Capacity", value: "capacity" },
        { text: "Lecturer", value: "lecturer" },
        { text: "Major", value: "major" },

        { text: "Action", value: "actions" },
      ],
    };
  },
};
</script>
