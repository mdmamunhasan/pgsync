#!/usr/bin/env bash

docker ps -a | egrep 'pgsync' | awk '{print $1}'| xargs docker kill
docker ps -a | egrep 'pgsync' | awk '{print $1}'| xargs docker rm

docker run -d --name  pgsync -p 8001:80 -e NODE_ENV='development' -e DB_HOST='tonic-core-db.ckvp0ck3llgr.ap-southeast-1.rds.amazonaws.com' -e DB_NAME="tonic_core" -e DB_USER="tcapi_admin" -e DB_PASSWORD="SomeSecretPassword" -e DB_PORT=5432 -e NODE_STREAM='2013-12-02' -e AWS_ACCESS_KEY_ID='AKIAJFDJF2NLFLHTWFPA' -e AWS_SECRET_ACCESS_KEY='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' -v /var/run/docker.sock:/var/run/docker.sock -v $(pwd):/app mmnhsn/pgsync
