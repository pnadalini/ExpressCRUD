# ExpressCRUD
A basic NodeJs server with Express to make CRUD operations with MongoDB calls.

It uses Redis to store information asked by the front-end aplication.

This project was created to work together with Angular 7 project [LabCrudRobots](https://github.com/pnadalini/LabCrudRobots)

## Docker

In order to create the docker images and run the container this is the command:

    docker-compose up

This command will pull Redis, Node and Mongo in order to use the API inside the container using the `docker-compose.yml` file
