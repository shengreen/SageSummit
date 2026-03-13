import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Simulation from '../views/Simulation.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/simulation', name: 'Simulation', component: Simulation }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
