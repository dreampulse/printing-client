#!/usr/bin/env bash

ZONE="924763cc40afc8b78600536e6eb5c652"

FILES="[\"https://print.all3dp.com/bundle.js\", \
        \"https://print.all3dp.com\"]"

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE/purge_cache" \
-H "X-Auth-Key:$CLOUDFLARE_API_KEY" \
-H "X-Auth-Email:$CLOUDFLARE_USER" \
-H "Content-Type: application/json" \
--data "{\"files\": $FILES}"
