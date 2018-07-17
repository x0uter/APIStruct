var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json({api: 'online'});
});

/*
 |--------------------------------------------------------------------------
 | GET
 |--------------------------------------------------------------------------
 */
router.get('/:route', function(req, res, next) {
    let hasResponse = false;
    var r = JSON.parse(fs.readFileSync(path.join(__dirname, './dRoutes/get/getRoutes.json'), 'utf8'));
    r.routes.forEach((p) => {
        if (p.path === req.params.route) {
            hasResponse = true;
            res.json(p.response);
        }
    })

    if(!hasResponse){
        res.json({error: 'route is not defined!'});
    }
});

module.exports = router;
