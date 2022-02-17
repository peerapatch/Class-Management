import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    example: {
      code: '',
      name: '',
      credit: '',
      section: '',
      capacity: '',
      lecturer: '',
      major: '',
      period: [
        {
          hours: 1,
          type: 0
        },
        {
          hours: 1,
          type: 1
        }
      ]
    },
    subjects: [
      {
        code: '240-210',
        name: 'Programing Technique',
        credit: '3',
        sect: '1',
        cap: '50',
        lect: 'Wasimon',
        maj: 'Coe'
      },
      {
        code: '240-333',
        name: 'Stat',
        credit: '2',
        sect: '1',
        cap: '100',
        lect: 'Krittasil',
        maj: 'Coe'
      },
      {
        code: '240-101',
        name: 'Intro',
        credit: '3',
        sect: '1',
        cap: '50',
        lect: 'Wasimon',
        maj: 'Coe'
      },

      {
        code: '240-333',
        name: 'VLIS',
        credit: '3',
        sect: '1',
        cap: '60',
        lect: 'Kullwat',
        maj: 'Coe'
      },
      {
        code: '240-321',
        name: 'Database',
        credit: '2',
        sect: '2',
        cap: '50',
        lect: 'Khwankamol',
        maj: 'Coe'
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
