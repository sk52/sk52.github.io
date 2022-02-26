---
title: React Project in Docker
tags: ['Docker', 'React']
date: '2021-12-02T18:00:00.000Z'
---

Building React projects locally is usually frictionless. Mostly commonly you'll start off with create-react-app to quickly get up and running. 
When it comes to deploying, there are various options, but getting the config correct can sometimes cause a headache.
Building a Docker image of your built React app can simplify this. Keep reading to find out how.

## What

We'll be using [React](https://reactjs.org/) to create a basic static site.
We'll also be using [Docker](https://www.docker.com/) to containerize the application, making it easy to run anywhere.
Within the Docker image, we'll be using a simple [nginx](https://www.nginx.com/) web server to serve up the static site's production build files.

## How

### Creating the Project

To create a project using [create-react-app](https://github.com/facebook/create-react-app):

```bash
npx create-react-app my-app
```

Once it's complete, we should be able to run the application using `npm run start`, and see the React logo spinning in our browser at localhost:3000

This is simply the local dev version of the application. It is mostly used to give quick feedback whilst developing the application.

### Creating the Dockerfile

Now, we'll go ahead and create a Dockerfile: 

```bash
touch Dockerfile
```

In that Dockerfile, we can add the following: 

```dockerfile
FROM node:14.9.0 AS build-step

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.18-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /build/build /frontend/build
```

This Dockerfile has two parts to it, the first part is referred to as `build-step` which you can see on the first line.
This step specifies our working directory as `/build`. 

Next, the package files are copied to the working directory, followed by an `npm install`.

We then copy the remaining files from our project into the working directory, and finally, run an `npm run build` command to build the production-ready code.

The second step is to configure the nginx server. You'll notice that we copy a `nginx.conf` file (we'll look at this in the next step).
And then, finally, we copy the build folder from the first step into a directory for nginx to use.

### Creating the Nginx Config

In the application root directory, we'll create a config file for nginx by running:

```bash
touch nginx.conf
```

Inside the file, we'll add the following:

```
user  nginx;
worker_processes  1;

events {
  worker_connections  1024;
}

http {
  include /etc/nginx/mime.types;
  server {
    listen 80;
    root /frontend/build;
    index index.html;

    location / {
      try_files $uri /index.html;
    }
  }
}
```

This configures a simple nginx web server, and specifies the root directory and index file that we copied in the later step of our Dockerfile. The nginx server will listen on port 80 as default. 

### .dockerignore

It is wise to add a `.dockerignore` file to the repository to minimise the number of files copied to the docker image. 

```bash
touch .dockerignore
```

Copy the contents of the default `.gitignore` file into the `.dockerignore` file

### Creating a docker-compose file

Now, we'll create a docker-compose file to help us with building our Docker image and passing any config that we need. 

```bash
touch docker-compose.yml
```

Inside the file we can then add:

```yml
version: '3.2'
services:
  my-app:
    build:
      context: .
      dockerfile: 'Dockerfile'
    ports:
      - '3000:80'
    volumes:
      - ./:/frontend
```

This specifies the service name, and the source of the Dockerfile (in this case, 'Dockerfile'). It also maps the port of the nginx server (80) to an external port 3000.

We can now build the image using the following command:

```bash
docker-compose up -d --build my-app
```

This might take some time.
Once complete, you should be able to access your React app on [localhost:3000](localhost:3000), served from within the Docker image. 

## Summary

In just a few steps we've been able to Dockerise a simple React app. This can help to simplify the process of deploying your production-code, or sharing the application with a friend to run locally.
