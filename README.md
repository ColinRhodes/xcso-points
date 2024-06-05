# xcso-points

> OST points calculation from CPL

## New HACK

The UI is using very outdated libs and no longer builds.  Just run `npm i && npm start`, then use the API directly from your browser.

```
http://localhost:8081/api/lists
http://localhost:8081/api/report?list-set-id=2023-04-04;2024-04-04

```

## OLD Build Setup

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

## OLD Heroku

< free plan is EOL - no longer hooked up to Heroku >

This app is designed to work with Heroku.  Once you have the Heroku CLI set up with a login and an app, you can add Heroku as a secondary Git remote and run `git push heroku master` to deploy.

The app is hosted at https://xcso-points.herokuapp.com
