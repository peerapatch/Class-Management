<template>
  <div>
    <v-btn
      @click="triggerAction"
      class="green white--text"
      elevation="0"
      width="200"
      >Create New Subject</v-btn
    >
    <v-dialog v-model="isDialogOpen" max-width="1200">
      <v-card class="px-10">
        <v-card-title>Create New Subject</v-card-title>
        <!-- {{ rooms }} -->
        <v-container class="mx-5 my-3">
          <v-row>
            <v-col>
              <v-select
              outlined
                label="Major"
                v-model="create_form.major"
                :items="selectable_major"
                item-text="title"
                @change="
                  getLecturersByFaculty(
                    create_form.major.faculty,
                    create_form.major
                  )
                "
                return-object
              />
            </v-col>
            <v-col>
              <v-text-field
                disabled
                :value="create_form.major.faculty"
              ></v-text-field>
            </v-col>
          </v-row>

 
          <v-autocomplete label="Lecturer" v-model="create_form.lecturer"  :items="lecturer" item-text="name" outlined
         return-object/>

          
          <v-text-field
            v-model="create_form.subject_code"
            label="Subject Code"
            outlined
          />
          <v-text-field
            v-model="create_form.subject_name"
            label="Subject Name"
            outlined
          />
          <v-text-field v-model="create_form.section" label="Section" outlined/>
          <v-text-field v-model="create_form.credit" label="Credit" outlined/>
          <v-text-field
          outlined
            v-model="create_form.capacity"
            label="Capacity"
            @change="findMatchedRoom(0)"
          />
          <v-container class="grey lighten-2">
            <v-row>
              <v-col class="d-flex justify-center"><b>Period</b></v-col>
              <v-col class="d-flex justify-center"><b>Time</b></v-col>
              <v-col class="d-flex justify-center"><b>Day</b></v-col>
              <v-col class="d-flex justify-center"><b>Start Time</b></v-col>
              <v-col class="d-flex justify-center"><b>Finish Time</b></v-col>
              <v-col class="d-flex justify-center"><b>Room</b></v-col>
            </v-row>
          </v-container>
          <v-container class="grey lighten-4">
            <v-row>
              <v-col class="d-flex justify-center" align-self="center"
                >First</v-col
              >
              <v-col class="d-flex justify-center" align-self="center"
                ><v-select
                  v-model="first_type"
                  :items="room_type"
                  item-text="title"
                  @change="findMatchedRoom(1)"
                  return-object
              /></v-col>
              <v-col class="d-flex justify-center">
                <v-select
                
                  v-model="create_form.period[0].weekday"
                  :items="days"
                />
              </v-col>
              <v-col align-self="center">
                <ClassTimePicker
                  class="d-flex justify-center"
                  v-if="create_form.period[0].start === '0:00'"
                  @selectTime="setStartTime(0, $event)"
                  text="Select"
                />
                <ClassTimePicker
                  class="d-flex justify-center"
                  v-else
                  @selectTime="setStartTime(0, $event)"
                  :text="create_form.period[0].start"
                />
              </v-col>
              <v-col align-self="center">
                <ClassTimePicker
                  class="d-flex justify-center"
                  v-if="create_form.period[0].finish === '0:00'"
                  @selectTime="setFinishTime(0, $event)"
                  text="Select"
                />
                <ClassTimePicker
                  class="d-flex justify-center"
                  v-else
                  @selectTime="setFinishTime(0, $event)"
                  :text="create_form.period[0].finish"
                />
              </v-col>
              <v-col align-self="center" class="d-flex justify-center">
                <v-select
                  v-model="create_form.period[0].room"
                  :items="selectable_rooms_first"
                  item-text="classroom_no"
                  item-value="classroom_no"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-container class="grey lighten-4">
            <v-row>
              <v-col align-self="center" class="d-flex justify-center"
                >Second</v-col
              >
              <v-col align-self="center" class="d-flex justify-center"
                ><v-select
                  v-model="second_type"
                  :items="room_type"
                  item-text="title"
                  @change="findMatchedRoom(2)"
                  return-object
              /></v-col>
              <v-col class="d-flex justify-center"
                ><v-select
                  v-model="create_form.period[1].weekday"
                  :items="days"
              /></v-col>
              <v-col align-self="center">
                <ClassTimePicker
                  class="d-flex justify-center"
                  v-if="create_form.period[1].start === '0:00'"
                  @selectTime="setStartTime(1, $event)"
                  text="Select"
                />
                <ClassTimePicker
                  class="d-flex justify-center"
                  v-else
                  @selectTime="setStartTime(1, $event)"
                  :text="create_form.period[1].start"
                />
              </v-col>
              <v-col align-self="center">
                <ClassTimePicker
                  class="d-flex justify-center"
                  v-if="create_form.period[1].finish === '0:00'"
                  @selectTime="setFinishTime(1, $event)"
                  text="Select"
                />
                <ClassTimePicker
                  class="d-flex justify-center"
                  v-else
                  @selectTime="setFinishTime(1, $event)"
                  :text="create_form.period[1].finish"
                />
              </v-col>
              <v-col align-self="center">
                <v-select
                  v-model="create_form.period[1].room"
                  :items="selectable_rooms_second"
                  item-text="classroom_no"
                  item-value="classroom_no"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-text-field
            v-model="create_form.remark"
            label="Remark"
            outlined
          ></v-text-field>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn width="150" class="green white--text" @click="createNewSubject"
            >Create</v-btn
          >
          <v-btn width="150" @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getLecturerByFaculty, createNewSubject } from "../../modules/fetch";
import ClassTimePicker from "../../components/class_time_picker.vue";
export default {
  name: "AddSubjectForm",
  components: {
    ClassTimePicker,
  },
  computed: {

    ...mapState({
      majors: (state) => state.majors,
      rooms: (state) => state.rooms,
      lecturer : (state) => state.lecturers,

      selectable_major() {
        return this.$store.state.majors.map((elem) => ({
          title: `${elem.major} | ${elem.year}`,
          major: elem.major,
          year: elem.year,
          faculty: elem.faculty,
        }));
      },
    }),
  },
  methods: {
    findMatchedRoom(order) {
      console.log(order);

      if (order === 1 || order === 0) {
        let result = this.rooms.filter(
          (room) =>
            room.type === this.first_type.type &&
            room.capacity >= this.create_form.capacity
        );
        this.selectable_rooms_first = result;
        console.log(result);
      }

      if (order === 2 || order === 0) {
        let result = this.rooms.filter(
          (room) =>
            room.type === this.second_type.type &&
            room.capacity >= this.create_form.capacity
        );

        this.selectable_rooms_second = result;
        console.log(result);
      }

      
    },
    clear_form() {
      this.create_form = {
        major: {},
        subject_code: "",
        subject_name: "",
        capacity: 0,
        lecturer: {},
        credit: 0,
        section: 1,
        remark: "",

        year: "",
        period: [
          {
            order_no: 0,
            start: "0:00",
            finish: "0:00",
            room: "",
            weekday: "Mon",
          },
          {
            order_no: 1,
            class_type: "",
            start: "0:00",
            finish: "0:00",
            room: "",
            weekday: "Mon",
          },
        ],
      };
    },
    convert_to_duration(index) {
      let result_1 = this.create_form.period[index].start.split(":");
      let result_2 = this.create_form.period[index].finish.split(":");
      return [
        Math.abs(result_1[0] - result_2[0]),
        Math.abs(result_1[1] - result_2[1]),
      ];
    },
    setStartTime(index, time) {
      this.create_form.period[index].start = time;
      this.time_duration[index] = this.convert_to_duration(index);
    },
    setFinishTime(index, time) {
      this.create_form.period[index].finish = time;
      this.convert_to_duration(index);
      this.time_duration[index] = this.convert_to_duration(index);
    },

    async getLecturersByFaculty(faculty, major) {
      this.create_form.year = major.year;
      let result = await getLecturerByFaculty(faculty);
      this.selectable_lecturers = result.data;
    },
    triggerAction() {
      this.isDialogOpen = true;
      this.$emit("createSubject");
    },

    async createNewSubject() {
      this.isDialogOpen = false;
      // console.log(this.create_form);
      await createNewSubject(this.create_form);
      this.clear_form();
      this.$store.dispatch("getAllSubject");
    },

    closeDialog() {
      this.isDialogOpen = false;
      this.clear_form();
    },
  },
  data() {
    return {
  
      selectable_rooms_first: [],
      selectable_rooms_second: [],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      selectable_lecturers: [],
      major: {},

      roomtype_1_enable_state: false,
      roomtype_2_enable_state: false,
      room_type: [
        {
          type: 0,

          title: "Lecture",
        },

        {
          type: 1,

          title: "Lab",
        },
      ],
      first_type: {
        type: 0,

        title: "Lecture",
      },
      second_type: {
        type: 0,

        title: "Lecture",
      },
      time_duration: [
        [0, 0],
        [0, 0],
      ],
      create_form: {
        major: {},
        subject_code: "",
        subject_name: "",
        lecturer: {},
        credit: "",
        capacity: "",
        section: "",
        remark: "",
        period: [
          {
            order_no: 0,
            start: "0:00",
            finish: "0:00",
            room: "",
            weekday: "Mon",
          },
          {
            order_no: 1,
            start: "0:00",
            finish: "0:00",
            room: "",
            weekday: "Mon",
          },
        ],
      },

      isDialogOpen: false,
    };
  },


  
};
</script>
