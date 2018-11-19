// Required fields
const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');
const robotModel = require('../models/robot.model');

// Connection information
const url = process.env.DB_URI || 'mongodb://localhost:27017/'; // Using mongo image: 'mongodb://mongo:27017/';
const dbName = 'robotDB';
const collectionName = 'robotDome';

function removeIds(robot) {
  // Remove ids set by the user
  delete robot.id;
  delete robot._id;
}

exports.createRobot = (async function (robot, callback) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    removeIds(robot);
    // Validate if the received json is a robot
    const { error } = robotModel.validate(robot);

    if (error) return callback(404, { error: error.details[0].message });

    // Connect to the database and insert the robot
    await client.connect();
    const db = client.db(dbName);

    let response = await db.collection(collectionName).insertOne(robot);
    assert.equal(1, response.insertedCount);
    callback(null, robot);
  } catch (err) {
    callback(500, { error: err.stack });
  }
  client.close();
});

exports.getRobots = (async function (id, callback) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    // Connect to the database and get a specific robot or the whole list
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

exports.updateRobot = (async function (id, robot, callback) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    removeIds(robot);
    // Validate if the received json is a robot
    const { error } = robotModel.optionalValidate(robot);
    if (error) return callback(404, { error: error.details[0].message });

    // Connect to the database and update the robot
    await client.connect();
    const db = client.db(dbName);
    var response = await db.collection(collectionName).updateOne({ "_id": new ObjectID(id) }, { $set: robot });
    if (response) {
      assert.equal(1, response.matchedCount);
      callback(null, response);
    } else
      callback(404, { error: `The robot with id: '${id}' was not found` });

  } catch (err) {
    callback(500, { error: err.stack });
  }
  client.close();
});

exports.deleteRobot = (async function (id, callback) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    // Connect to the database and delete the robot
    await client.connect();
    const db = client.db(dbName);
    var response = await db.collection(collectionName).deleteOne({ "_id": new ObjectID(id) });
    if (response && response.deletedCount) {
      assert.equal(1, response.deletedCount);
      callback(null, response);
    } else callback(404, { error: `The robot with id: '${id}' was not found` });

  } catch (err) {
    callback(500, { error: err.stack });
  }
  client.close();
});
