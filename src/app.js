import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import hello from './components/Hello.vue'
import home from './components/home.vue'
import sore from './components/sore.vue'
import { sync } from 'vuex-router-sync'
Vue.use(Router)
Vue.use(Vuex)
const nrouter=new Router({
  mode:'history',
  routes:[
    {path:'/',component:hello},
    {path:'/home',component:home},
    {path:'/sore',component:sore}
  ]
})
const store=new Vuex.Store({
  state:{}
})
export function createApp (){
  sync(store,nrouter)
  const app =new Vue(
    {
      router:nrouter,
      store,
      render:h=>h(App)
    }
  )

  return {app,nrouter,store}
}
