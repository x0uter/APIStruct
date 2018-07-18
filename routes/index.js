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
  res.render('database', {title: 'API Struct'});
});

router.get('/createroute', function (req, res, next) {
  res.render('createroute', {title: 'API Struct'});
});

/*
|--------------------------------------------------------------------------
| POST ENDPOINTS
|--------------------------------------------------------------------------
*/


module.exports = router;
