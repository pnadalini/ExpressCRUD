const express = require('express');
const router = express.Router();

const controller = require('../controllers/robot.controller');

router.use(express.json());

// CREATE
router.post('/', (req, res) => {
  controller.createRobot(req.body, (errCode, data) => {
    res.status(errCode || 201).send(data);
  });
});

// READ
router.get('/:id?', (req, res) => {
  controller.getRobots(req.params.id, (errCode, data) => {
    res.status(errCode || 200).send(data);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  controller.updateRobot(req.params.id, req.body, (errCode, data) => {
    res.status(errCode || 204).send(data);
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  controller.deleteRobot(req.params.id, (errCode, data) => {
    res.status(errCode || 204).send(data);
  });
});

module.exports = router;
