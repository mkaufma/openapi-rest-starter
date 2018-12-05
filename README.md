# openapi REST starter

Looking for a way for making my openapi (swagger) files hold the routing logic of
my application I came accross [openapi-backend package](https://github.com/anttiviljami/openapi-backend)
This package was for me the easiest to use for my purposes.
If you look at app.js you can see that I modified it to get all openapi schemas from one folder,
and take all handlers from another folder. 
Note that this package stills needs lots of refinements to become a boilerplate.
However, if you want to fastly create an application based on a swagger file or an open api file it will to the job.
This package also contains a small config POC implementation - init configurtion when starting the application
and along the applcation access it from 'global.appConfig'.


### Features:
- Extend the use of [openapi-backend package](https://github.com/anttiviljami/openapi-backend) for more than one schema
- [Express.js](https://expressjs.com/) as the web framework.
- ES2017+ support with [Babel](https://babeljs.io/).
- Automatic polyfill requires based on environment with [babel-preset-env](https://github.com/babel/babel-preset-env).
- Linting with [ESLint](http://eslint.org/).
- Testing with [Jest](https://facebook.github.io/jest/).

## Getting started

```sh
# Clone the project
git clone https://github.com/mkaufma/openapi-rest-starter.git
cd openapi-rest-starter

yarn install

```
Then you can begin development:

```sh
# yarn
yarn run dev

```

This will launch a [nodemon](https://nodemon.io/) process for automatic server restarts when your code changes.

### Testing

Testing is powered by [Jest](https://facebook.github.io/jest/). This project also uses [supertest](https://github.com/visionmedia/supertest) for demonstrating a simple routing smoke test suite. Feel free to remove supertest entirely if you don't wish to use it.

Start the test runner in watch mode with:

```sh
# yarn
yarn test

```

### Deployment

Deployment is specific to hosting platform/provider but generally:

```sh
# yarn
yarn run build

```

will compile your `server` into `/dist`, and 

```sh
# yarn
yarn start

```

will run `build` (via the `prestart` hook) and start the compiled application from the `/dist` folder.

The last command is generally what most hosting providers use to start your application when deployed, so it should take care of everything.

## License
MIT License. See the [LICENSE](LICENSE) file.
