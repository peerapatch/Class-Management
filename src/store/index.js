import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getAllMajor, getAllClassRoom, getAllSubject } from '../modules/fetch.js'
export default new Vuex.Store({
  state: {
    lecturers: [],
    subjects: [],
    majors: [],
    rooms: [],
  },
  mutations: {
  },
  actions: {
    async getAllMajor() {
      let result = await getAllMajor();
      this.state.majors = result.data
    },
    async getAllRoom() {
      let result = await getAllClassRoom();
      this.state.rooms = result.data
    },

    async getAllSubject() {
      let result = await getAllSubject();
      this.state.subjects = result
    }
  },
  modules: {

  }
})
