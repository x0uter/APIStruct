var express = require('express');
var fs = require('fs');
var path = require('path');

var router = express.Router();

/*
|--------------------------------------------------------------------------
| GET ENDPOINTS
|--------------------------------------------------------------------------
*/
router.get('/', function (req, res, next) {
  var getRoutes = JSON.parse(fs.readFileSync(path.join(__dirname, './dRoutes/get/getRoutes.json'), 'utf8'));
  var deleteRoutes = JSON.parse(fs.readFileSync(path.join(__dirname, './dRoutes/delete/deleteRoutes.json'), 'utf8'));
  var postRoutes = JSON.parse(fs.readFileSync(path.join(__dirname, './dRoutes/post/postRoutes.json'), 'utf8'));
  var putRoutes = JSON.parse(fs.readFileSync(path.join(__dirname, './dRoutes/put/putRoutes.json'), 'utf8'));

  res.render('index', {
    title: 'API Struct',
    getRoutes: getRoutes.routes,
    deleteRoutes: deleteRoutes.routes,
    postRoutes: postRoutes.routes,
    putRoutes: putRoutes.routes
  });
});

router.get('/database', function (req, res, next) {
  var db = JSON.parse(fs.readFileSync(path.join(__dirname, '../db.json'), 'utf8'));
  res.render('database', { title: 'API Struct', db: db });
});

router.get('/createroute', function (req, res, next) {
  res.render('createroute', { title: 'API Struct' });
});

/*
|--------------------------------------------------------------------------
| POST ENDPOINTS
|--------------------------------------------------------------------------
*/
router.post('/database', function (req, res, next) {
  const dbconfig = {
    "server": req.body.server,
    "user": req.body.user,
    "password": req.body.password,
    "database": req.body.database
  }

  fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(dbconfig, null, "\t"));

  res.redirect('/');
});

/*
|--------------------------------------------------------------------------
| DELETE ENDPOINTS
|--------------------------------------------------------------------------
*/
router.delete('/deleteroute', function (req, res, next) {
  let filePath = null
  switch (req.body.method) {
    case 'GET': {
      filePath = './dRoutes/get/getRoutes.json';
      break;
    }
    case 'POST': {
      filePath = './dRoutes/post/postRoutes.json';
      break;
    }
    case 'PUT': {
      filePath = './dRoutes/put/putRoutes.json';
      break;
    }
    case 'DELETE': {
      filePath = './dRoutes/delete/deleteRoutes.json';
      break;
    }
  }

  deleteRoute(filePath, req.body.route);

  res.sendStatus(200);
})

/*
|--------------------------------------------------------------------------
| AUX FUNCTIONS
|--------------------------------------------------------------------------
*/
function deleteRoute(filePath, route) {
  var allRoutes = JSON.parse(fs.readFileSync(path.join(__dirname, filePath), 'utf8'));
  allRoutes.routes = allRoutes.routes.filter(function (elem) {
    return elem.path !== route;
  });
  fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(allRoutes, null, "\t"));
}


module.exports = router;
