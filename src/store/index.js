import Vue from 'vue'
import Vuex from 'vuex'
import { getAllMajor, getAllClassRoom, getAllSubject } from '../modules/fetch.js'

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
