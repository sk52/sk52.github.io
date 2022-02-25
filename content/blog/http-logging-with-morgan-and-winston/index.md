---
title: HTTP Logging with Morgan and Winston
date: '2022-02-25T09:00:00.000Z'
---

Adding HTTP logging to an Express app can provide useful insights when debugging production bugs. 
We'll walk through how to add logging which looks something like this:

```bash
2022-02-25T11:46:04.194Z [http] GET / 200 32 - 5.867 ms
2022-02-25T11:46:26.073Z [http] GET /user 304 - - 0.957 ms
```

## Pre-requisites

We'll need a simple Node.js / Express application. You can find the example repo for this demo [here](https://github.com/sk52/morgan-winston-example).

## How

First, we need to install [Morgan](https://www.npmjs.com/package/morgan) and [Winston](https://github.com/winstonjs/winston):

`npm i morgan winston --save`

Morgan provides HTTP request logging middleware, whilst Winston gives us the logging capability. 

Now that we've installed the required dependencies, let's require them in our `index.js` file:

```javascript
const morgan = require('morgan');
const winston = require('winston');

const { format } = winston;
``` 

Then we'll be able to declare our logger using Winston:

```javascript
const logger = winston.createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf((msg) => {
            return `${msg.timestamp} [${msg.level}] ${msg.message}`;
        })
    ),
    transports: [new winston.transports.Console({level: 'http'})],
});
```

Let's take a look at what we're setting up here. We're passing a config object into the `createLogger` method that we're calling. 

The config object has a few fields. `format` defines how we would like our log messages to be formatted. There are a number of options for this, which can be found in more detail [here](https://github.com/winstonjs/winston#colorizing-standard-logging-levels). 

In our example, we're using a combination of winston format types, and the `format.printf` option is simply setting up how our logs will be arranged. You can customise this as required. 

Finally, the `transports` field declares the storage type for the log messages. In our case, we're just outputting these logs to the console. The transport has a `level` declared, which indicates the maximum logger level to be output for that transport type.

Next, we can set up our Morgan logging middleware:

```javascript
const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream: {
            write: (message) => logger.http(message.trim()),
        },
    }
);
```

Here we're passing some arguments into `morgan`. The first argument is `format`, the second is `options`.

Our `format` argument is simply a string of predefined tokens, as per the Morgan [docs](https://www.npmjs.com/package/morgan#using-format-string-of-predefined-tokens). 

The `options` argument is an object containing a single field: `stream`. This indicates the output stream for our logs. In our case, we pass an object with a callback function which simply calls the `http` method on the `logger` instance that we have set up earlier.
By doing this, our Morgan HTTP log will be passed to the Winston logger, where additional formatting such as timestamp will be added. 

Finally, we tell our app to use the middleware:

```javascript
app.use(morganMiddleware);
```

## Summary

As demonstrated, it's straightforward to setup both Winston and Morgan on an Node.js / Express application. The end result is some wonderfully formatted logs which show us some useful info about the HTTP requests being handled by our server. 
