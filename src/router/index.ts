import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';


const routes: Array<RouteRecordRaw> = [
  {
    name: 'Game',
    path: '/',
    component: () => import('@/views/fl-game-view/fl-game-view.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
