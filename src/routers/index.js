import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import cenimaRouter from './cenima'
import mineRouter from './mine'

Vue.use(Router)

export default new Router({
  mode: 'history',
  //base: process.env.BASE_URL,
  base : 'maiomi',
  routes: [
    movieRouter,
    cenimaRouter,
    mineRouter,
    {
      path: '/*',
      redirect:'/movie'
    }
  ]
})
