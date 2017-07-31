const path =require('path')
const webpack =require('webpack')
const mfs= require('memory-fs')
const clientconfig = require('./webpack.client.config')
const serverconfig = require('./webpack.server.config')

const readfile = (fs,file)=>{
  try{
    return fs.readFileSync(path.join(clientconfig.output.path,file),'utf-8')
  }catch(e){}
}

module.exports = function setDevEnvironment(app,cb){
  var bundle,clientManifest
  var resolve
  var readyPromise = new Promise(r=>{ resolve=r})
  function ready(b,o){
    resolve()
    cb(b,o)
  }

clientconfig.entry.app=['webpack-hot-middleware/client', clientconfig.entry.app]
clientconfig.output.filename = '[name].js'
clientconfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
)

const clientCompiler =webpack(clientconfig)
const devMiddleware = require('webpack-dev-middleware')(clientCompiler,{
  publicPath:clientconfig.output.publicPath,
  noInfo:true
})

app.use(devMiddleware)

clientCompiler.plugin('done', stats => {
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(err => console.warn(err))
  if (stats.errors.length) return

  clientManifest = JSON.parse(readfile(
    devMiddleware.fileSystem,
    'vue-ssr-client-manifest.json'
  ))
  if (bundle) {
    ready(bundle, clientManifest)
  }
})

  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }))

  const serverCompiler = webpack(serverconfig)
  const mf = new mfs()
  serverCompiler.outputFileSystem = mf
  serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  if (stats.errors.length) return


  bundle = JSON.parse(readfile(mf, 'vue-ssr-server-bundle.json'))
  if (clientManifest) {
    ready(bundle, clientManifest)
  }
})

return readyPromise
  }
