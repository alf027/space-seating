/**
 * Created by Alfano on 7/9/15.
 */
var routes = require('routes')(),
  fs = require('fs'),
  db = require('monk')('localhost/spaceSeats'),
  users = db.get('users'),
  seats = db.get('seats'),
  qs = require('qs'),
  mime = require('mime'),
  view = require('./view'),
  bcrypt = require('bcrypt');

routes.addRoute('/', function (req, res, url) {

  if (req.session.get('email')) {
    console.log(req.session.get('email'));
    seats.find({}, function (err, docs) {
      //if(err) {
      //  res.end('404');
      //}
      var template = view.render('/index', {seats: docs});
      res.end(template);
    });

  } else {
    req.session.flush();
    res.writeHead(302, {'Location': '/login'});
    res.end()
  }

});


routes.addRoute('/register', function (req, res, url) {
  if (req.method === 'GET') {
    // 1. Respond with the `sessions/register`page with
    //    our view module. `view.render('path', {})`
    res.setHeader('Content-Type', 'text/html');
    var template = view.render('/register', {title: 'Register'});
    res.end(template)
  }

  if (req.method === 'POST') {
    // 1. Collect form data with async accumulator
    // 2. Insert user into database
    // 3. Create the session with req.session.put('email', doc.email)
    //    Note: you will need to do this inside of the monk
    //    callback function.
    var data = '';

    req.on('data', function (chunk) {
      data += chunk
    });

    req.on('end', function () {
      var user = qs.parse(data);
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      users.insert(user, function (err, doc) {
        if (err) {
          res.writeHead(302, {'Location': '/'});
          res.end();
          return
        }
        req.session.put('email', doc.email);
        req.session.put('imgUrl', doc.imgUrl);
        res.writeHead(302, {'Location': '/'});
        res.end()
      })
    })
  }
});


routes.addRoute('/login', function (req, res, url) {
  if (req.method === 'GET') {
    var template = view.render('/login', {title: 'Log In'});
    res.end(template)

  }
  if (req.method === 'POST') {
    var data = '';

    req.on('data', function (chunk) {
      data += chunk
    });

    req.on('end', function () {
      var user = qs.parse(data);
      users.findOne({email: user.email}, function (err, doc) {
        if (doc) {
          if (bcrypt.compareSync(user.password, doc.password)) {
            req.session.put('email', doc.email);
            req.session.put('imgUrl', doc.imgUrl);
            res.writeHead(302, {'Location': '/'});
            res.end();
          } else {
            res.writeHead(302, {'Location': '/register'});
            res.end();
          }
        }
      });
    });
  }
});

routes.addRoute('/home/:id/:seatId/delete', function (req, res, url) {
  console.log(url.route);
  res.setHeader('Content-Type', 'text/html');
  var rowId = url.params.id;
  var seatId = url.params.seatId;
  var email = req.session.get('email');

  console.log('delete');
  if (req.method === 'GET') {
    console.log(rowId);
    console.log(seatId);
    console.log(req.session.get('email'));
    if(seatId < 8) {
      seats.findOne({_id: rowId}, function (err, doc) {
        console.log('MONGOOOOOOOOSE');
        console.log(doc.row1[seatId - 1]);

        doc.row1[seatId - 1].occupant = '';

        console.log(doc.row1[seatId - 1].occupant);

        seats.update({_id: rowId}, doc, function (err, doc) {
          console.log(err);
          console.log(doc);
        })
      });
    }
    if(seatId <15 && seatId > 7) {
      seats.findOne({_id: rowId}, function (err, doc) {
        console.log(doc);
        console.log('MONGOOOOOOOOSE');
        console.log(doc.row2[seatId - 8]);

        doc.row2[seatId - 8].occupant = '';
        console.log(doc.row2[seatId - 8].occupant);

        seats.update({_id: rowId}, doc, function (err, doc) {
          console.log(err);
          console.log(doc);
        })
      });
    }

    if(seatId <22 && seatId >14) {
      seats.findOne({_id: rowId}, function (err, doc) {
        console.log(doc);
        console.log('MONGOOOOOOOOSE');
        console.log(doc.row3[seatId - 15]);

        doc.row3[seatId - 15].occupant = '';
        console.log(doc.row3[seatId - 15].occupant);

        seats.update({_id: rowId}, doc, function (err, doc) {
          console.log(err);
          console.log(doc);
        })
      });
    }

    if(seatId <29 && seatId >21) {
      seats.findOne({_id: rowId}, function (err, doc) {
        console.log(doc);
        console.log('MONGOOOOOOOOSE');
        console.log(doc.row4[seatId - 22]);

        doc.row4[seatId - 22].occupant = '';
        console.log(doc.row4[seatId - 22].occupant);

        seats.update({_id: rowId}, doc, function (err, doc) {
          console.log(err);
          console.log(doc);
        })
      });
    }



    //if (err) console.log(err);
    res.writeHead(302, {'Location': '/'});
    res.end();



    //seats.update({_id: rowId, 'seatId':seatId}, {'occupant':email} ,function (err, doc) {
    //  console.log('MONGOOOOOOOOSE');
    //  console.log(doc);
    //  if (err) console.log(err);
    //  res.writeHead(302, {'Location': '/bands/'});
    //
    //  res.end()
    //});

  }


});

routes.addRoute('/home/:id/:seatId', function (req, res, url) {
  console.log(url.route);
  res.setHeader('Content-Type', 'text/html');
  var rowId = url.params.id;
  var seatId = url.params.seatId;
  var email = req.session.get('email');
  var picture = req.session.get('imgUrl');
  console.log(picture);

  if (req.method === 'POST') {
    console.log(rowId);
    console.log(seatId);
    console.log(req.session.get('email'));
  if(seatId < 8) {
    seats.findOne({_id: rowId}, function (err, doc) {
      console.log('MONGOOOOOOOOSE');
      console.log(doc.row1[seatId - 1]);

      doc.row1[seatId - 1].occupant = email;

      console.log(doc.row1[seatId - 1].occupant);

      seats.update({_id: rowId}, doc, function (err, doc) {
        console.log(err);
        console.log(doc);
      })
    });
  }
    if(seatId <15 && seatId > 7) {
      seats.findOne({_id: rowId}, function (err, doc) {
        console.log(doc);
        console.log('MONGOOOOOOOOSE');
        console.log(doc.row2[seatId - 8]);

        doc.row2[seatId - 8].occupant = email;
        console.log(doc.row2[seatId - 8].occupant);

        seats.update({_id: rowId}, doc, function (err, doc) {
          console.log(err);
          console.log(doc);
        })
      });
    }

    if(seatId <22 && seatId >14) {
      seats.findOne({_id: rowId}, function (err, doc) {
        console.log(doc);
        console.log('MONGOOOOOOOOSE');
        console.log(doc.row3[seatId - 15]);

        doc.row3[seatId - 15].occupant = email;
        console.log(doc.row3[seatId - 15].occupant);

        seats.update({_id: rowId}, doc, function (err, doc) {
          console.log(err);
          console.log(doc);
        })
      });
    }

    if(seatId <29 && seatId >21) {
      seats.findOne({_id: rowId}, function (err, doc) {
        console.log(doc);
        console.log('MONGOOOOOOOOSE');
        console.log(doc.row4[seatId - 22]);

        doc.row4[seatId - 22].occupant = email;
        console.log(doc.row4[seatId - 22].occupant);

        seats.update({_id: rowId}, doc, function (err, doc) {
          console.log(err);
          console.log(doc);
        })
      });
    }



      //if (err) console.log(err);
    res.writeHead(302, {'Location': '/'});
    res.end();



    //seats.update({_id: rowId, 'seatId':seatId}, {'occupant':email} ,function (err, doc) {
    //  console.log('MONGOOOOOOOOSE');
    //  console.log(doc);
    //  if (err) console.log(err);
    //  res.writeHead(302, {'Location': '/bands/'});
    //
    //  res.end()
    //});

  }


});

routes.addRoute('/logout',function (req, res, url)  {
  req.session.flush();
  res.writeHead(302, {'Location': '/'});
  res.end()

})

routes.addRoute('/public/*', function (req, res, url) {
  console.log('public');
  res.setHeader('Content-Type', mime.lookup(req.url));
  fs.readFile('.' + req.url, function (err, file) {
    if (err) {
      res.end('404');
    } else {
      res.end(file)
    }

  })
});

module.exports = routes;