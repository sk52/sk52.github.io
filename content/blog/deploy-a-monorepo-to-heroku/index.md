---
title: Deploying a Monorepo to Heroku
tags: ['Heroku', 'Monorepo']
date: '2021-05-01T18:28:00.000Z'
---

If you've ever thought about splitting your web application into more than one microservice whilst keeping them under the same GitHub repository, you may have wondered how you can deploy each microservice to separate Heroku dynos with ease.

In this blog post I'll show you how to achieve this for a monorepo comprising two node.js applications using the [Heroku Multi-Profile Buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-multi-procfile).

## What and Why

Separating an application into several separate microservices has multiple benefits:

- Ability to separate a large and complex application into small and manageable services
- Developers can work on different parts of the application independent of each other
- Scaling the application can be done on a per-service basis

Deploying a monolithic application to Heroku is simple enough, there's plenty of information out there which [documents how](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up). For a monorepo it gets a little more complex. Read on to find out how.

## Prerequisites

- A heroku account (free tier works fine)
- Heroku CLI
- A monorepo structure containing two node.js projects as follows

```
example-app
    --packages
        |--client
        |   |--package.json
        |   |--package-lock.json
        |
        |--server
            |--package.json
            |--package-lock.json
    --package.json
    --package-lock.json
```

## How to

1. Whilst logged in to Heroku create two new apps:
   - `example-app` - this will be our client application which end users access
   - `example-app-server` - this will be the server application which our client application integrates with
2. In each application on Heroku, navigate to the settings tab and scroll down to "Buildpacks". On each application we'll add two buildpacks:
   - First, add the multi-procfile buildpack by pasting this link - `https://github.com/heroku/heroku-buildpack-multi-procfile`
   - Next, add the `heroku/nodejs` buildpack
3. Now we need to write our Procfiles and add these to their respective application folders

   - What is a Procfile? It's a file which specifies the commands to run when starting an application. Heroku uses this to fire up your application during deployment.
   - In `packages/server` directory, run the command:

   ```bash
   echo "web: cd packages/server && node server.js" > Procfile
   ```

   - In `packages/client` directory, run the command

   ```bash
   echo "web: cd packages/client && node server.js" > Procfile
   ```

   - Now we should be setup with both Procfiles which tell Heroku how to start our two applications

4. Now, over in our repository we'll need to use the Heroku CLI to specify our Profile locations, this lets Heroku know where to find the Procfiles.

   - For this, we'll use the names of our Heroku applications that we set in step 1
   - Run the following commands:

   ```bash
   heroku config:set -a example-app PROCFILE=packages/client/Procfile
   ```

   ```bash
   heroku config:set -a example-app-server PROCFILE=packages/server/Procfile
   ```

   - Now Heroku knows where to find the Procfiles for our two applications

5. Heroku now knows where to find our Procfiles, however, because we have two separate applications stored within the `client` and `server` directories, each has their own dependencies. Heroku typically tries to install dependencies as specified in the `package.json` at the root of the project, and similarly will try to run the build script specified here. To ensure we install the correct dependencies and run the correct build scripts for our application, we need to specify a `postinstall` script in the root of our project.

   - In the `package.json` file in the project root, add the following scripts:

   ```bash
       "scripts": {
           "postinstall": "if [ $CLIENT_ENV ]; then npm run postinstall-client; elif [ $SERVER_ENV ]; then npm run postinstall-server; else echo no environment detected, please set CLIENT_ENV or SERVER_ENV; fi",
           "postinstall-client": "cd packages/client && npm install && npm run build",
           "postinstall-server": "cd packages/server && npm install"
       }
   ```

   - We've added three scripts: `postinstall`, `postinstall-client`, and `postinstall-server`
   - Heroku will automatically run the `postinstall` script for us upon deployment
   - Our postinstall script looks for environment variables `$CLIENT_ENV` or `$SERVER_ENV` to determine which postinstall script to run

6. Finally, we need to go into the set two environment variables in our applications on Heroku
   - Go to the Settings tab and scroll to Config Vars
   - In the client application, add `CLIENT_ENV=true`
   - In the server application, add `SERVER_ENV=true`
   - Now our postinstall script will be able to run the correct install scripts for each of our applications on deployment
7. That's it! Everything should now be set up to deploy multiple applications versioned under a monorepo to several Heroku applications. Just set your Heroku applications up to deploy on push and you should be ready to go next time you push changes.

## Thoughts

This setup process provides a way of carrying out a monorepo deployment to Heroku whilst making use of the tools that Heroku offers. For more complex applications the deployment process may be better handled by a scripted pipeline using something like GitHub Actions. This would likely involve more steps, but could offer more control over the deployment process and gives the ability to incorporate it into a CI/CD pipeline which carries out unit testing and other quality steps.
