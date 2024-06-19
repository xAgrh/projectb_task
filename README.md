# Coding Challenge: NestJS Backend with Employee Module and Email Service

Task is to set up a NestJS backend, focusing on building an employee management module with CRUD functionalities, integrated with an email service that operates through a queue system.

## 🎯 Assignment

**Objective:** Develop a NestJS backend application with an employee module for managing employee data and an email service triggered by a queue.

### Requirements
CRUD for Employee entity
+ email service that sends notifications on employee creation by using queue system (like Bull) to manage and trigger email notifications asynchronously.

### Prerequisites

To be able to run this repository on your machine, you will need to have the following installed:
- NodeJS (> 14)
- Docker
- docker-compose > v2

```bash
# If you start it from wsl, be sure that docker daemon is running
sudo dockerd
```

### Installing Dependencies

To install all needed Node dependencies, you can run:

```
npm install
```

### Copy env variable file

The code rests upon certain environemt variables that are expected to be declared inside a `.env` file.

Those variables are defined (with sensible defaults) in `.env.sample`, so you can copy that file as such:

```
cp .env.sample .env
```


### Prepare docker images
You can use Docker to create a local instance of the MongoDB and redis.

To do so, you first need to build the images with:
```
make build
```

### Database
You can then start the service with:
```
make db
```

### Redis
You can then start the service with:
```
make redis
```

#### Pre-populate database
If this is your first time running the database service, make sure to manually run
```
npm run migrate:up
```
to pre-populate the database with sensible data.


## Development
Once everything is installed and set up, you can start the project in development mode by running:
```
npm run dev
```

## Documentation
After you will start app API docs will be available at 
```
http://localhost:3000/api/projectb/docs
```

## Test
```bash
# unit tests
$ npm run test
```
