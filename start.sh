#!/usr/bin/env bash

docker ps -a | egrep 'pgsync' | awk '{print $1}'| xargs docker kill
docker ps -a | egrep 'pgsync' | awk '{print $1}'| xargs docker rm

docker run -d --name  pgsync -p 8001:80 -e NODE_ENV='development' -e NODE_STREAM='2013-12-02' -e PGHOST='tonic-core-db.ckvp0ck3llgr.ap-southeast-1.rds.amazonaws.com' -e PGUSER="tcapi_admin" -e PGPASSWORD="SomeSecretPassword" -e PGPORT=5432 -e PGDATABASE="tonic_core" -e AWS_ACCESS_KEY_ID='AKIAJFDJF2NLFLHTWFPA' -e AWS_SECRET_ACCESS_KEY='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' -v /var/run/docker.sock:/var/run/docker.sock -v $(pwd):/app mmnhsn/pgsync
