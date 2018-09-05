#!/usr/bin/env bash

# fail early on simple command errors and missing env variables
set -eu

ZONE="924763cc40afc8b78600536e6eb5c652"

FILES="[\"https://print.all3dp.com/\", \
        \"https://print.all3dp.com/index.html\"]"

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE/purge_cache" \
-H "X-Auth-Key:$CLOUDFLARE_API_KEY" \
-H "X-Auth-Email:$CLOUDFLARE_USER" \
-H "Content-Type: application/json" \
--data "{\"files\": $FILES}"
