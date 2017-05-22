#!/usr/bin/env bash

EMAIL="plica@all3dp.com"
API_KEY="9dc9f1e3898fa8a34b6b56b8977d71529c685"

ZONE="924763cc40afc8b78600536e6eb5c652"

FILES="[\"https://print.all3dp.com/bundle.js\", \
        \"https://print.all3dp.com\"]"

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE/purge_cache" \
-H "X-Auth-Key:$API_KEY" \
-H "X-Auth-Email:$EMAIL" \
-H "Content-Type: application/json" \
--data "{\"files\": $FILES}"
