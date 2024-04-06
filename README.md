
# Logger by Avernix Technologies

Logger is a functional and expandable logging tool




## Installation

Install @trarn/logger with npm

```bash
  npm i @trarn/logger
```
    
## Usage


```javascript
// CommonJS
const { Logger, createLogger } = require('@trarn/logger');

// ESM
import { Logger, createLogger } from '@trarn/logger';
```

#### Initializing

```javascript
// Using the built in class
const logger = new Logger({});

// Using createLogger()
const logger = createLogger({});
```

#### Passable Parameters

Logger/createLogger accept three main parameters

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Optional**. Sets the name in the logger. Defaults to empty string. |
| `debugMode`      | `boolean` | **Optional**. Enables or disables debug level logs. Defaults to true. |
| `customLogLevels`      | `object` | **Optional**. Allows additional log levels to be set. Defaults to empty object. |


#### Passing in Parameters

Passing in parameters will be the same for both the built in Logger class and createLogger, we will use createLogger for the example.

```javascript
const logger = createLogger({
    name: 'My Super Cool App',
    debugMode: true,
    customLogLevels: {
        testing: '#00FFFF',
        emergency: '#FF4000',
        simple: '#00FF00',
    },
});
```
---
#### Setting The Logger Name

A common use case for this is disabling debug level logs in production, the quickest and easiest way of achieving that is through toggling the debugMode parameter.

```javascript
// Passing in a string
const logger = createLogger({
    name: 'My Super Cool App',
});

// Passing in a variable
const MY_APP_NAME = 'Another Super Cool Name';
const logger = createLogger({
    name: MY_APP_NAME,
});

// Passing in a variable set by ENV.
const MY_APP_NAME = process.env.NODE_ENV === 'development' ? 'Another Super Cool Name Development' : 'Another Super Cool Name';
const logger = createLogger({
    name: MY_APP_NAME,
});
```

This is just one method you can use, if your application has another way of checking environments, you can make those return true or false and set it that way as well.

---
#### Handling debugMode

A common use case for this is disabling debug level logs in production, the quickest and easiest way of achieving that is through toggling the debugMode parameter.

```javascript
const logger = createLogger({
    debugMode: process.env.NODE_ENV === 'development' ? true : false,
});
```

This is just one method you can use, if your application has another way of checking environments, you can make those return true or false and set it that way as well.

---

#### Using Prebuilt Log Levels

```javascript
// 'data' in this case is an object, you can also pass in arrays, nested arrays, ..etc

// Using .log requires setting the level as a property
  logger.log('error', 'this is a very distinct error message', data);

// Using a log level method. Method in this case being the level below.
  logger.method('this is a very distinct error message', data)
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `log`      | `method` | Accepts three properties, level, message, and data. Data can be an object, array, etc. |
| `info`      | `method` | Accepts two properties; message and data. Again, data can be an object, array, etc. Default color: #00FF00 |
| `debug`      | `method` | Accepts two properties; message and data. Again, data can be an object, array, etc. Default color: #0000FF |
| `error`      | `method` | Accepts two properties; message and data. Again, data can be an object, array, etc. Default color: #FF0000 |
| `http`      | `method` | Accepts two properties; message and data. Again, data can be an object, array, etc. Default color: #D3D3D3 |
| `notice`      | `method` | Accepts two properties; message and data. Again, data can be an object, array, etc. Default color: #00FFFF |
| `warn`      | `method` | Accepts two properties; message and data. Again, data can be an object, array, etc. Default color: #FFFF00 |
| `crit`      | `method` | Accepts two properties; message and data. Again, data can be an object, array, etc. Default color: #FF00FF |
| `danger`      | `method` | Accepts two properties; message and data. Again, data can be an object, array, etc. Default color: #FF4000 |
| `ignore`      | `method` | Accepts two properties; message and data. The data will be irrelevant as ignore does not display any data |

---
#### Using Custom Log Levels

As seen in "Passing In Parameters", you can pass in customLogLevels with a name an hex color. For example

```javascript
const logger = createLogger({
    customLogLevels: {
        testing: '#00FFFF',
    },
});

// You can use both dot (.) notation, or pass it in as a property using .log, either will present the same result in the console.

// Using .log requires setting the level as a property
  logger.log('testing', 'this is a very distinct error message', data);

// Using a log level method, this can only be done when utilizing createLogger.
// Using a new instance of Logger with a custom method will throw an error.
  logger.testing('this is a very distinct error message', data)
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `customLevel`      | `method` | Accepts three properties, level, message, and data. Data can be an object, array, etc. |
| `customLevel`      | `method` | Accepts two properties; message and data. Again, data can be an object, array, etc. Default color: #00FF00 |

---
#### Adding Transports

Adding transports is as simple as declaring them, and using the "addTransport" method to add them.

```javascript
// In this example, we use the @trarn/logger-logtail transport.
// When creating a new transport from scratch, the "addTransport" method calls a method named "log" to handle it's logic. A guide is WIP.

const { TrarnLoggerLogtailTransport } = require('@trarn/logger-logtail');

const logtailTransport = new TrarnLoggerLogtailTransport(`${process.env.LOGTAIL_TOKEN}`);
logger.addTransport(logtailTransport, secondaryTransport);
```

---
#### Changing Default Colors

One of the perks of being able to set your log levels, is being able to override existing ones as well.

```javascript
const logger = createLogger({
    customLogLevels: {
        info: '#FF0000', // info will now always log as a vibrant red color
    },
});
```

---






## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Info | ![#00FF00](https://via.placeholder.com/10/00FF00?text=+) #00FF00 |
| Debug | ![#0000FF](https://via.placeholder.com/10/0000FF?text=+) #0000FF |
| Error | ![#FF0000](https://via.placeholder.com/10/FF0000?text=+) #FF0000 |
| Http | ![#D3D3D3](https://via.placeholder.com/10/D3D3D3?text=+) #D3D3D3 |
| Notice | ![#00FFFF](https://via.placeholder.com/10/00FFFF?text=+) #00FFFF |
| Warn | ![#FFFF00](https://via.placeholder.com/10/FFFF00?text=+) #FFFF00 |
| Crit | ![#FF00FF](https://via.placeholder.com/10/FF00FF?text=+) #FF00FF |
| Danger | ![#FF4000](https://via.placeholder.com/10/FF4000?text=+) #FF4000 |


## Authors

- [@avernixtechnologies](https://www.github.com/avernixtechnologies)


## FAQ

#### Is the API currently documented for integration

No, currently we are not supporting external library integration, however if you end up making a package that relies on Logger, let us know and we will review it an add it here in "Used By"



## Support

For support, email support@avernix.com or join our Discord channel [Our Discord](https://discord.gg/zpdd6VTxwg).


## Contributing

We will be setting up a way for people to contribute, in the mean time, fork and create a pull request. Thanks!


## Feedback

If you have any feedback, please reach out to us at feedback@avernix.com


## Avernix Technologies

Avernix Technologies is a software company dedicated to providing solutions for businesses big and small, or even hobbyists.



## License

[MIT](https://choosealicense.com/licenses/mit/)


## Roadmap

- Support more Chalk properties and settings

- Add more integrations and allow users to create libraries


## Used By

This project is used by the following companies:

- Avernix Technologies
- Prestige Gaming

