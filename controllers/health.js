var router = require('express').Router();
var helper = require('../helpers/helper');

// health route
router.get('/', function (req, res, next) {
  try {
    res
      .status(200)
      .json(helper.getResponseObject(
        'OK',
        200,
        'Success'
      ));
  } catch (err) {
    next(err);
  }
});

module.exports = router;