#!/usr/bin/env bash -eu

ORGANIZATION="all3dp-gmbh"
PROJECT="printing-engine-client"
RELEASE=$RELEASE_ID
TOKEN=$SENTRY_API_TOKEN
URL=$DEPLOY_URL
DIST_PATH="./dist"

printf "Creating sentry release $RELEASE_ID..."
curl https://sentry.io/api/0/projects/$ORGANIZATION/$PROJECT/releases/ \
  -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"version\": \"$RELEASE\"}" \
  -f -v
printf "\nDone."

cd $DIST_PATH

for line in $(find . -name '*.js.map' -type f | sed 's|./||'); do

  printf "Uploading $line..."
  curl https://sentry.io/api/0/projects/$ORGANIZATION/$PROJECT/releases/$RELEASE/files/ \
    -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -F file=@$line \
    -F name="$DEPLOY_URL/$line" \
    -f -v
  printf "\nDone."

done

cd ..
