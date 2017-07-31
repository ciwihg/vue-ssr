import {createApp} from './app';

const {app,nrouter,store} = createApp();
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
nrouter.onReady(()=>{
  nrouter.beforeResolve((to,from,next)=>{
  const matched = nrouter.getMatchedComponents(to);
  console.log(matched);
})
  app.$mount('#app');
})
