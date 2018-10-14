const Joi = require('joi');
const express = require('express');
const router = express.Router();

const controller = require('../controllers/robot.controller');

router.use(express.json());

var robots = [
  { "name": "MrRobot", "model": "2018", "manufacturer": "China", "attack": "500", "defense": "400" },
  { "name": "Gundam", "model": "2020", "manufacturer": "Japan", "attack": "550", "defense": "350" },
  { "name": "El Roboto", "model": "2019", "manufacturer": "Guatemala", "attack": "600", "defense": "290" },
  { "name": "Le Automate", "model": "2016", "manufacturer": "France", "attack": "405", "defense": "580" },
  { "name": "Wall-e", "model": "2008", "manufacturer": "USA", "attack": "100", "defense": "200" }
];

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
  const id = req.params.id;
  if (!id || id < 0 || id >= robots.length) return res.status(404).send(`The robot with id: '${id}' was not found`);

  const schema = {
    name: Joi.string(),
    model: Joi.string(),
    manufacturer: Joi.string(),
    attack: Joi.number().min(0).max(1000),
    defense: Joi.number().min(0).max(1000)
  };
  const { error } = Joi.validate(req.body, schema);

  if (error) return res.status(400).send(error.details[0].message);

  for (let rKey in req.body) {
    robots[id][rKey] = req.body[rKey];
  }

  res.status(204).send(`${robots[id].name}, with id: '${id}' was succesfully updated`);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (!id || id < 0 || id >= robots.length) return res.status(404).send(`The robot with id: '${id}' was not found`);

  res.status(204).send(robots.splice(id, 1));
});

module.exports = router;
