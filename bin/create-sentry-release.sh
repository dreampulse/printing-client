#!/usr/bin/env bash -eu

npm i sentry-cli-binary

export SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN
export SENTRY_ORG="all3dp-gmbh"
export SENTRY_PROJECT="printing-engine-client"
DIST_PATH="./dist"
SOURCE_MAPS=$(find $DIST_PATH -name '*.js.map' -type f)
VERSION=$(npx sentry-cli releases propose-version)

npx sentry-cli releases new $VERSION
npx sentry-cli releases set-commits --auto $VERSION

for FILE in $SOURCE_MAPS; do
  npx sentry-cli releases files $VERSION upload-sourcemaps --rewrite $FILE
done

npx sentry-cli releases finalize $VERSION
npx sentry-cli releases deploys $VERSION new -e production
