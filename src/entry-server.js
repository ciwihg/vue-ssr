import {createApp} from './app'

export default context =>{
  return new Promise((resolve,reject)=>{
    const {app,nrouter,store}= createApp();

    const {url} =context;
    nrouter.push(url);
    nrouter.onReady(
      ()=>{
          const matchedComponents = nrouter.getMatchedComponents();
          console.log(matchedComponents);
          context.state = store.state
        resolve(app);
      }
    )
  })
}
