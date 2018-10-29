const express = require('express');
const redis = require('redis');
const router = express.Router();

const controller = require('../controllers/robot.controller');
const client = redis.createClient();
const listKey = 'robotList';
const singleKey = 'robotId=';

// Manage redis connection and errors
client.on('connect', function () {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Redis error ' + err);
});

router.use(express.json());

// CREATE
router.post('/', (req, res) => {
  client.del(listKey);
  controller.createRobot(req.body, (errCode, data) => {
    res.status(errCode || 201).send(data);
  });
});

// READ
router.get('/:id?', (req, res) => {
  let redisKey = req.params.id ? singleKey + req.params.id : listKey;
  // Verify if redis has the robot list or specific robot acording to the id
  client.get(redisKey, (error, result) => {
    if (error || !result) {
      // If there was no cache found, go to the database an retrieve the data
      controller.getRobots(req.params.id, (errCode, data) => {
        if (!errCode) {
          // Sets the response on redis with 10 minutes of life
          client.set(redisKey, JSON.stringify(data), redis.print);
          client.expire(redisKey, 600);
        }
        res.status(errCode || 200).send(data);
      });
    } else {
      // Return the result from cache      
      res.status(200).send(JSON.parse(result));
    }
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  client.del(listKey);
  client.del(singleKey + req.params.id);
  controller.updateRobot(req.params.id, req.body, (errCode, data) => {
    res.status(errCode || 204).send(data);
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  client.del(listKey);
  client.del(singleKey + req.params.id);
  controller.deleteRobot(req.params.id, (errCode, data) => {
    res.status(errCode || 204).send(data);
  });
});

module.exports = router;
