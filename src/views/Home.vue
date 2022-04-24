<template>
  <v-container fluid class="ma-10 test">
    {{ major_filter }}
    {{ default_faculty }}
    <v-row>
      <v-col cols="2"
        ><v-select :items="major_filter" item-text="title" return-object v-model="default_faculty" 
      /></v-col>
      <v-col cols="10"></v-col>
    </v-row>
    <class-table-component :events="result" />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ClassTableComponent from "../components/ClassTableComponent.vue";
export default {
  components: {
    ClassTableComponent,
  },
  // sun 6

  // sat 12
  data() {
    return {
      default_faculty : { "title": "CoE | 2565", "major": "CoE", "year": "2565", "faculty": "CoC" }


     
    };
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
  },
  computed: {
    ...mapState({
      subjects: (state) => state.subjects,
      majors: (state) => state.majors,
    }),

    major_filter() {
      return this.$store.state.majors.map((elem) => ({
        title: `${elem.major} | ${elem.year}`,
        major: elem.major,
        year: elem.year,
        faculty: elem.faculty,
      }));
    },

    result() {
      let new_array_result = [];
      this.$store.state.subjects.forEach((element_lv1) => {
        element_lv1.period.forEach((element_lv2) => {
          if (element_lv1.faculty === this.default_faculty.faculty && element_lv1.year ===  this.default_faculty.year && element_lv1.major ===this.default_faculty.major ) {
            new_array_result.push({
              code: element_lv1.subject_code,
              name: element_lv1.subject_name,
              yrs: 65,
              room: element_lv2.room,
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
  },
};
</script>


