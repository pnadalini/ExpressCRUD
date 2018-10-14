// Required fields
const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');
const robotModel = require('../models/robot.model');

// Connection information
const url = 'mongodb://localhost:27017/';
const dbName = 'robotDB';
const collectionName = 'robotDome';

const idRegex = new RegExp("^[0-9a-fA-F]{24}$");

exports.createRobot = (async function (robot, callback) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    // Validate if the received json is a robot
    const { error } = robotModel.validate(robot);

    if (error) return callback(400, { error: error.details[0].message });

    // Connect to the database and insert the robot
    await client.connect();
    const db = client.db(dbName);

    let response = await db.collection(collectionName).insertOne(robot);
    assert.equal(1, response.insertedCount);
    robot.id = robot._id;
    delete robot._id;
    callback(null, robot);
  } catch (err) {
    callback(500, { error: err.stack });
  }
  client.close();
});

exports.getRobots = (async function (id, callback) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    // Validate if there's an id for a specific robot and if that id is valid
    if (id && !idRegex.test(id))
      return callback(400, { error: `The specified id: '${id}' is not valid` });
    
    // Connect to the database and insert the robot
    await client.connect();
    const db = client.db(dbName);
    var response = id ? await db.collection(collectionName).findOne({ "_id": new ObjectID(id) }) : await db.collection(collectionName).find({}).toArray();
    if (response)
      callback(null, response);
    else
      callback(404, id ? { error: `The robot with id: '${id}' was not found` } : { error: `There were no robots found` });

  } catch (err) {
    callback(500, { error: err.stack });
  }
  client.close();
});
