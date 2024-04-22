# xcso-points

> OST points calculation from CPL

## Build Setup

``` bash
# install dependencies
npm install

# build with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run server
npm start
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Heroku

This app is designed to work with Heroku.  Once you have the Heroku CLI set up with a login and an app, you can add Heroku as a secondary Git remote and run `git push heroku master` to deploy.

The app is hosted at https://xcso-points.herokuapp.com

## Docker

To run the app under docker you can follow these instructions:

1. Install Docker Desktop from https://www.docker.com/products/docker-desktop
2. From a terminal or command prompt run the following commands:
	1. Build the docker image: `docker build -t xcso-points .`
	2. Run the docker image: `docker run -d -p 8081:8081 xcso-points`
3. Open a web browser and navigate to `http://localhost:8081/`
