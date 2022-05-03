<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <!-- <v-select
          outlined
          :items="rooms"
          item-text="classroom_no"
          value="classroom_no"
          @change="findSubjectByRoom(room)"
          v-model="room"
        ></v-select
      > -->
        <v-autocomplete
          outlined
          :items="rooms"
          item-text="classroom_no"
          value="classroom_no"
          @change="findSubjectByRoom(room)"
          v-model="room"
          placeholder="Search By Classroom"
        >
        </v-autocomplete>
      </v-col>
      <v-col> </v-col>
    </v-row>
    <class-table-component :events="subject_and_room" />
  </v-container>
  <!-- <div>
    {{ subject_and_room }}
    <v-btn @click="findSubjectByRoom(6307)">Find</v-btn>
  </div> -->
</template>

<script>
import ClassTableComponent from "../components/ClassTableComponent.vue";
import { mapState } from "vuex";
export default {
  name: "ClassByRoom",
  components: {
    ClassTableComponent,
  },
  computed: {
    ...mapState({
      subjects: (state) => state.subjects,
      rooms: (state) => state.rooms,
    }),
  },
  methods: {
    getDayInt(val) {
      if (val === "Sun") return "06";
      if (val === "Mon") return "07";
      if (val === "Tue") return "08";
      if (val === "Wed") return "09";
      if (val === "Thu") return "10";
      if (val === "Fri") return "11";
      if (val === "Sat") return "12";
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    findSubjectByRoom(room) {
      console.log(room);
      let result = [];
      this.subjects.forEach((element_lv1) => {
        let subject_color = this.colors[this.rnd(0, this.colors.length - 1)];

        element_lv1.period.forEach((element_lv2) => {
          if (element_lv2.room === room.toString()) {
            result.push({
              color: subject_color,
              code: element_lv1.subject_code,
              name: element_lv1.subject_code + " " + element_lv1.subject_name + " " + `(${element_lv1.lecturer})`,
              start: `2019-01-${this.getDayInt(element_lv2.weekday)} ${
                element_lv2.start
              }`,
              end: `2019-01-${this.getDayInt(element_lv2.weekday)} ${
                element_lv2.finish
              }`,

              room: element_lv2.room,
              lecturer: element_lv1.lecturer,
              weekday: element_lv2.weekday,
            });
          }
        });
      });

      console.log(result);

      this.subject_and_room = result;
    },
  },

  data() {
    return {
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
        "purple darken-4",
        "indigo darken-4",
        "deep-purple darken-1",
        "light-blue darken-1",
        "teal darken-2",
        "indigo darken-4",
        "indigo darken-3",
        "indigo darken-2",
        "indigo darken-1",
        "blue darken-1",
        "blue darken-2",
        "blue darken-3",
        "blue darken-4",
        "green darken-1",
        "green darken-2",
        "green darken-3",
        "green darken-4",
        "light-green darken-4",
        "light-green darken-3",
        "light-green darken-2",
        "light-green darken-1",
      ],
      subject_and_room: [],
      room: "",
    };
  },
};
</script>

<style>
</style>