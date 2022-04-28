import Vue from 'vue'
import Vuex from 'vuex'
import { getAllMajor, getAllClassRoom, getAllSubject, getAllLecturers } from '../modules/fetch.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    lecturers: [],
    subjects: [],
    majors: [],
    rooms: []
  },
  mutations: {
  },
  actions: {
    async getAllMajor () {
      const result = await getAllMajor()
      this.state.majors = result.data
    },
    async getAllRoom () {
      const result = await getAllClassRoom()
      this.state.rooms = result.data
    },

    async getAllSubject () {
      console.log('get subject')
      const result = await getAllSubject()
      this.state.subjects = result
    },
    async getAllLecturers () {
      const result = await getAllLecturers()

      this.state.lecturers = result.map((elem) => ({
        _id: elem._id,
        name: elem.first_name + ' ' + elem.last_name,
        faculty: elem.faculty,
        type: elem.type

      }))
    }
  },

  getters: {
    getSubjectsByLecturer: (state) => (lecturer_name) => {
      return state.subjects.filter((subject) => subject.lecturer === lecturer_name)
    }
  },
  modules: {

  }
})
