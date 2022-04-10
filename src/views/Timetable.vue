<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
        </v-toolbar>
      </v-sheet>
      <v-sheet class="fill-height">
        <v-calendar
        dark
          ref="calendar"
          v-model="focus_current_date"
          color="primary"
          :events="formatted_time"
          type="day"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
// import { getAllSubject } from "../modules/fetch";
import { mapState } from "vuex";
import { getAllSubject } from "../modules/fetch";
// import { getAllSubject } from '../modules/fetch';
export default {
  name: "Timetable",
  computed: {
    ...mapState({
      subjects: (state) => state.subjects,
    }),
  },
  created() {
    this.get_time_subject();
    // this.set_formatted_time()
  },

  data: () => ({
    subject_time: [],
    formatted_time: [],
    focus_current_date: "",
    type: "day",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    async get_time_subject() {
      let result_subject = await getAllSubject();
      let temp_evt = [];
      let t1 = {};
      let t2 = {};

      console.log('result subject --> ',result_subject)
      result_subject.forEach((elem1) => {
        elem1.period.forEach((elem2) => {
          if (elem2.order_no === 0 && elem2.weekday !== "") {
            t1 = {
              name: elem1.subject_name + " Rm." + elem2.room,
              start: elem2.start,
              finish: elem2.finish,
              weekday: elem2.weekday,
              timed: true,
            };
          }

          if (elem2.order_no === 1 && elem2.weekday !== "") {
            t2 = {
              name: elem1.subject_name + " Rm." + elem2.room,
              start: elem2.start,
              finish: elem2.finish,
              weekday: elem2.weekday,
              timed: true,
            };
          }
        });


        
        if (Object.keys(t1).length !== 0) {
          // console.log('t1' , t1)
          temp_evt.push(t1);
        }
        if (Object.keys(t2).length !== 0) {
          // console.log('t2' , t2)
          temp_evt.push(t2);
        }
      });
      console.log('temp evt -> ', temp_evt)
      let result = [];
      let temp = {};
      let time;
      if (this.focus_current_date === "") {
        time = new Date();
      } else {
        time = new Date(this.focus_current_date);
      }

      let timeToString = time.toString();
      let splited = timeToString.split(" ");
      let splited_start = timeToString.split(" ");
      let splited_finsh = timeToString.split(" ");

      temp_evt.forEach((elem) => {
        splited_start[4] = elem.start;
        splited_finsh[4] = elem.finish;
        
        if (elem.weekday === splited[0]) {
          temp = {
            start: new Date(splited_start.join(" ")),
            end: new Date(splited_finsh.join(" ")),
            name: elem.name,
            color: this.colors[this.rnd(0, 6)],
            timed:
              splited_start[4] === "0:00" || splited_start[4] === "0:00"
                ? false
                : true,
          };
          result.push(temp);
        }
      });
      console.log("result", result);
      this.formatted_time = result;
    },
    viewDay({ date }) {
      this.focus_current_date = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus_current_date = "";
      this.get_time_subject();
    },
    prev() {
      this.$refs.calendar.prev();
      this.get_time_subject();
    },
    next() {
      this.$refs.calendar.next();
      this.get_time_subject();
      let date = new Date(this.focus_current_date);
      console.log(date);
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style>
</style>