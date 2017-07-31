const fs = require('fs');
const path = require('path')
const favicon = require('serve-favicon')
var express = require('express');
var Vue = require('vue');
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
var app = express();
app.use(favicon('./public/logo-48.png'))
app.use('/compile-res',express.static(resolve('./compile-res')));
const template = fs.readFileSync(resolve('./src/indext.html'), 'utf-8')
var renderer,readyp;
readyp=require('./build/set-dev-environment')(app,(b,o)=>{
  renderer=createBundleRenderer(b,{template,o});
})

function render(req,res){
 var hello=new Vue({template:'<div>hello world!</div>'});
 const context={
   url:req.url
 }
  renderer.renderToString(context,(err,html)=>{
    res.end(html);
  })
}

app.get('*',(req,res)=>{readyp.then(()=>render(req,res))});

app.listen(1234,()=>{console.log('server started at localhost:1234')});
