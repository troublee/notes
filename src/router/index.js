import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Notes',
    component: () => import('../views/Notes')
  },
  {
    path: '/note/:id',
    name: 'Note',
    component: () => import('../views/Note.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
