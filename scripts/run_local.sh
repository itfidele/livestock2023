#! bin/bash
source .env
yarn build
heroku config:set NODE_ENV="local"
heroku local web