/**
 * Created by Alfano on 7/9/15.
 */
var routes = require('routes')(),
  fs = require('fs'),

  qs = require('qs'),
  mime = require('mime'),
  view = require('./view');

routes.addRoute('/', function(req,res,url) {

  if(req.method==='GET') {
        template = view.render('/index',{});
        res.write(template);
        res.end()

      }


});
module.exports = routes;