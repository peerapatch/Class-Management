<template>
  <div>
    <v-btn @click="triggerAction">Create New Subject</v-btn>
    <v-dialog v-model="isDialogOpen">
      <v-card>
        <v-container class="mx-5 my-3">
          <v-row>
            <v-col>
              <v-select
                label="Major"
                v-model="create_form.major"
                :items="majors"
                item-text="major"
                @change="getLecturersByFaculty(create_form.major.faculty)"
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

          <v-select
            label="Lecturer"
            v-model="create_form.lecturer"
            :items="selectable_lecturers"
            item-text="name"
            return-object
          />
          <v-text-field
            v-model="create_form.subject_code"
            label="Subject Code"
          />
          <v-text-field
            v-model="create_form.subject_name"
            label="Subject Name"
          />
          <v-text-field v-model="create_form.section" label="Section" />
          <v-text-field v-model="create_form.credit" label="Credit" />
          <v-text-field
            v-model="create_form.capacity"
            label="Capacity"
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
                >{{ time_duration[0][0] }} Hrs.
                {{ time_duration[0][1] }} Min</v-col
              >
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
                  :items="rooms"
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
                >{{ time_duration[1][0] }} Hrs.
                {{ time_duration[1][1] }} Min</v-col
              >
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
                  :items="rooms"
                  item-text="classroom_no"
                  item-value="classroom_no"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-text-field
            v-model="create_form.remark"
            label="Remark"
          ></v-text-field>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="createNewSubject">Create</v-btn>
          <v-btn @click="closeDialog">Cancel</v-btn>
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
    }),
  },
  methods: {
    clear_form() {
      this.create_form = {
        major: {},
        subject_code: "",
        subject_name: "",
        capacity : 0,
        lecturer: {},
        credit: 0,
        section: 1,
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

    async getLecturersByFaculty(faculty) {
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
      this.$store.dispatch('getAllSubject')
    },

    closeDialog() {
      this.isDialogOpen = false;
      this.clear_form();
    },
  },
  data() {
    return {
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      selectable_lecturers: [],
      major: {},
      time_duration: [
        [0, 0],
        [0, 0],
      ],
      create_form: {
        major: {},
        subject_code: "",
        subject_name: "",
        lecturer: {},
        credit: 0,
        capacity : 0,
        section: 0,
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
