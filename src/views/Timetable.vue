<template>
  <v-row class="fill-height">
    

    <v-col>
      {{ formatted_time }}
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <!--  :events="subject_in_current_day"   -->
        <v-calendar
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
    this.set_formatted_time()
  },

  data: () => ({
    subject_time: [],
    formatted_time: [],
    focus_current_date: "",
    type: "day",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,

    events: [
      //   {
      //     name: "TEST",
      //     start: new Date("Fri Apr 15 2022 01:15:00 GMT+0700 (Indochina Time)"),
      //     end: new Date("Fri Apr 15 2022 02:15:00 GMT+0700 (Indochina Time)"),
      //     color: "blue",
      //     timed: true,
      //   },
      //   {
      //     name: "TEST1",
      //     start: new Date("Fri Apr 15 2022 02:15:00 GMT+0700 (Indochina Time)"),
      //     end: new Date("Fri Apr 15 2022 04:15:00 GMT+0700 (Indochina Time)"),
      //     color: "blue",
      //     timed: true,
      //   },
      //   {
      //     name: "TEST2",
      //     start: new Date("Fri Apr 15 2022 04:15:00 GMT+0700 (Indochina Time)"),
      //     end: new Date("Fri Apr 15 2022 05:15:00 GMT+0700 (Indochina Time)"),
      //     color: "blue",
      //     timed: true,
      //   },
    ],
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
    async set_formatted_time() {
    // let axios_res = await getAllSubject()
    // let res_subject = axios_res
    // console.log('res -: ',res_subject)
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

      this.subject_time.forEach((elem) => {
        splited_start[4] = elem.start;
        splited_finsh[4] = elem.finish;

        if (elem.weekday === splited[0]) {
          temp = {
            start: new Date(splited_start.join(" ")),
            end: new Date(splited_finsh.join(" ")),
            name: elem.name,
            color: "blue",
            timed:
              splited_start[4] === "0:00" || splited_start[4] === "0:00"
                ? false
                : true,
          };
          result.push(temp);
        }
      });
      this.formatted_time = result;
      //   return result;
    },

    async get_time_subject() {
        
      let temp_evt = [];
      let t1 = {};
      let t2 = {};
      this.subjects.forEach((elem1) => {
        elem1.period.forEach((elem2) => {
          if (elem2.order_no === 0 && elem2.weekday !== "") {
            t1 = {
              name: elem1.subject_name,
              start: elem2.start,
              finish: elem2.finish,
              weekday: elem2.weekday,
              timed: true,
            };
          }

          if (elem2.order_no === 1 && elem2.weekday !== "") {
            t2 = {
              name: elem1.subject_name,
              start: elem2.start,
              finish: elem2.finish,
              weekday: elem2.weekday,
              timed: true,
            };
          }
        });
        temp_evt.push(t1);
        temp_evt.push(t2);
      });

      //   console.log(t1);
      //   console.log(t2);
      console.log(temp_evt);

      this.subject_time = temp_evt;
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
      this.set_formatted_time();
    },
    prev() {
      this.$refs.calendar.prev();
      this.set_formatted_time();
      //   let curr = new Date(this.focus_current_date).toString();
      //   console.log(curr.split(" "));
    },
    next() {
      this.$refs.calendar.next();
      console.log(this.focus_current_date);
      this.set_formatted_time();
    },

    updateRange({ start, end }) {
      console.log(start);
      console.log(end);
      //   const events = [];

      //   const min = new Date(`${start.date}T00:00:00`);
      //   const max = new Date(`${end.date}T23:59:59`);
      //   const days = (max.getTime() - min.getTime()) / 86400000;
      //   const eventCount = this.rnd(days, days + 20);

      //   for (let i = 0; i < eventCount; i++) {
      //     const allDay = this.rnd(0, 3) === 0;
      //     const firstTimestamp = this.rnd(min.getTime(), max.getTime());
      //     const first = new Date(firstTimestamp - (firstTimestamp % 900000));
      //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
      //     const second = new Date(first.getTime() + secondTimestamp);

      //     events.push({
      //       name: this.names[this.rnd(0, this.names.length - 1)],
      //       start: first,
      //       end: second,
      //       color: this.colors[this.rnd(0, this.colors.length - 1)],
      //       timed: !allDay,
      //     });
      //   }

      //   this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style>
</style>