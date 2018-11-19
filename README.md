# ExpressCRUD
A NodeJs server with Express to make CRUD operations with MongoDB calls.

It uses Redis to store the information from the calls made to this API.

This project was created to work together with Angular 7 project [LabCrudRobots](https://github.com/pnadalini/LabCrudRobots)

The project uses the structure from express generator, it was modified so it doesn't use the view and 
`app.js` calls `routes/robot.route.js` which handles all the crud operations using Redis to check if the data 
is already on cache.

Otherwise it calls `controllers/robot.controller.js` that handles this calls getting it from MongoDB and returning the info.
It also checks the structure of the received robot using the model located in `models/robot.model.js`

## Docker

In order to create the docker images and run the container this is the command:

    docker-compose up

This command will pull Redis, Node and Mongo in order to use the API inside the container using the `docker-compose.yml` file

To run docker with the fron-ent app, follow the instructions of the comments in `docker-compose.yml` and put that file in the root of your project so it's structured in the following way:

```bash
├── mean-docker
│   ├── ExpressCRUD/
│   │   ├── **
│   │   └── Dockerfile
│   ├── LabCrudRobots/
│   │   ├── **
│   └── └── Dockerfile
└── docker-compose.yml
```