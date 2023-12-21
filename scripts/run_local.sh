#! bin/bash
source .env
pnpm run build
heroku config:set NODE_ENV="local"
heroku local web