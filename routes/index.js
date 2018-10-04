var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id?', (req, res, next) => {
  let id = req.params.id;
  res.send('You just made a get');
});

router.post('/:robot', (req, res, next) => {
  let newObj = req.params.robot;
  console.log('you just made a post');
});

router.put('/:id/:robot', (req, res, next) => {
  let id = req.params.id;
  let newObj = req.params.robot;
  console.log('you just made a put');
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  console.log('you just made a delete');
});

module.exports = router;
