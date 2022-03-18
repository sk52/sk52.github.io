---
title: Environment Variable Validation Using Joi
tags: ['Node.js', 'Express']
date: '2022-03-18T15:00:00.000Z'
---

Validating environment variables against a defined schema is a vital part of app-startup. We'll show how to achieve this using Joi. When pushing code to higher environments, it's easy to forget to add the necessary environment variables to your deployment environment. This can lead to unusual or hard-to-spot errors in your application code. 

## Prerequisites 

- Node and npm installed


## Setting up the Express App

First, we'll initialise a new node project:

```bash
npm init
```

Follow the steps to create your `package.json` file. 

Now let's install the dependencies we need:

```bash
npm i --save express dotenv joi 
```

We're using [express](https://www.npmjs.com/package/express) to build a simple web server, [dotenv](https://www.npmjs.com/package/dotenv) to load our environment variables from a `.env` file, and finally [joi](https://www.npmjs.com/package/joi) for validating our env vars against a schema.

Now we'll create our .env file: 

```bash
touch .env
```

In `.env` we can add whatever environment variables we might need:

```env
PORT=3000
CLIENT_ID=example-app
```

** Don't forget to add this file to your `.gitignore` to keep any important secrets and API keys out of version control.

Now we can create a simple Express server:

```bash
touch index.js
```

And then we'll add the following to our `index.js` file:

```javascript
require('dotenv').config();
const express = require('express');

const app = new express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('home route...');
});

app.listen(PORT, () => {
    console.log('App is listening on port ', PORT);
});
```

The first line is importing the `dotenv` package and calling it's `config()` method, which will load the environment variables from the `.env` file that we created earlier. It will allow us to access them like on line 6 using `process.env.PORT` for example. 

The rest is a simple Express app, we won't go into too much detail. In short, it's registering a single GET endpoint `/`, and listening on the port that we set in our `.env` file. 

If you run `node index.js`, you should be able to access it at [localhost:3000/](http:localhost:3000/) and see this in your browser:

```text
home route...
```

## Adding Env Var Validation

Now we've got a boilerplate Express app, it's time to add env var validation. 

First, we'll create a new file:

```bash
touch configValidator.js
```

In the file, let's add some stuff:

```javascript
const Joi = require('joi');

function validateConfig(envVars) {
    const envSchema = Joi.object().keys({
        PORT: Joi.number().required(),
        CLIENT_ID: Joi.string().required(),
    }).unknown();
    
    const { error } = envSchema.validate(envVars);

	console.log(error);
}

exports.validateConfig = validateConfig;
```

We're declaring a function `validateConfig` which contains our schema `envSchema`. For larger applications with more environment variables, it would probably make sense to separate the schema and the function. In our case, it's a small demo app so we've done it all in the same place. 

The `envSchema` that we declare is written using the methods provided by Joi. The syntax for this can all be found in the [Joi docs](https://joi.dev/api/). We've declared our `PORT` as a number that is required, and our `CLIENT_ID` as a string that is also required. 

Finally, we've chained a `.unknown()`. The reason for this is that our local environment will have plenty of other environment variables on top of what we've defined in our `.env` file. Chaining `.unknown()` tells Joi to ignore these unknown keys when validating something against the schema. 

At the moment, this function is a void function which is simply logging the `error` object to the console. Let's update this to pull out some useful information, and throw an error. Our `configValidator.js` file becomes:

```javascript
const Joi = require('joi');

function validateConfig(envVars) {
    const envSchema = Joi.object().keys({
        PORT: Joi.number().required(),
        CLIENT_ID: Joi.string().required(),
    }).unknown();
    
    const { error } = envSchema.validate(envVars);

    if (error) {
        const errorMessages = error.details.reduce((acc, curr) => {
            acc.push(curr.message); 
            return acc;
        }, []);
        
        throw new Error(`Env var config validation error: ${JSON.stringify(errorMessages)}`);
    }
}

exports.validateConfig = validateConfig;
```

Now, when any of the values don't match the schema requirements, an error will be thrown which details what's wrong. 

## Calling the Validator Function in our Express App

Finally, we can call this validator function from our Express app. In `index.js` let's add the following two lines straight after our imports:

```javascript
const { validateConfig } = require('./configValidator');

validateConfig(process.env);
```

Our `index.js` file should now look like this:

```javascript
require('dotenv').config();
const express = require('express');
const { validateConfig } = require('./configValidator');
validateConfig(process.env);

const app = new express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('home route...');
});

app.listen(PORT, () => {
    console.log('App is listening on port ', PORT);
});
```

As simple as that. Now, our app will check against our schema that the necessary environment variables before it starts up. If any are missing or invalid, it will throw an error, alerting us to the problem. 

When adding new environment variables, simply update the schema to reflect the changes. 

## Summary

Adding schema validation using Joi is really straightforward. Using this for the environmnet variables in an app is a useful step in app instantiation, highlighting any easy mistakes early on, saving you from spending time on confusing bugs due to config. The full repo of this example can be found [here](https://github.com/sk52/env-var-validation-example).
