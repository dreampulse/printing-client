#!/usr/bin/env bash

# fail early on simple command errors and missing env variables
set -eu

# SENTRY_AUTH_TOKEN must be set externally
# exported env variables are used by the sentry-cli
export SENTRY_ORG="all3dp-gmbh"
export SENTRY_PROJECT="printing-engine-client"
SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DIST_PATH="./dist"
VERSION=$( "$SCRIPT_PATH"/get-sentry-release-version.sh )

npx sentry-cli releases new "$VERSION"
npx sentry-cli releases set-commits --auto "$VERSION"
npx sentry-cli releases files "$VERSION" upload-sourcemaps --rewrite --ignore-file "$SCRIPT_PATH"/.sentryignore "$DIST_PATH"
npx sentry-cli releases finalize "$VERSION"
npx sentry-cli releases deploys "$VERSION" new -e production
