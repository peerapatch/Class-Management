import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ClassroomManagement from '../views/ClassroomManagement.vue'
import LecturerManagement from '../views/LecturerManagement.vue'
import MajorManagement from '../views/MajorManagement.vue'
import SubjectManagement from '../views/SubjectManagement.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/classroom',
    name: 'ClassroomManagement',
    component: ClassroomManagement
  },
  {
    path: '/lecturer',
    name: 'LecturerManagement',
    component: LecturerManagement
  },
  {
    path: '/major',
    name: 'MajorManagement',
    component: MajorManagement
  },
  {
    path: '/subject',
    name: 'SubjectManagement',
    component: SubjectManagement
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
