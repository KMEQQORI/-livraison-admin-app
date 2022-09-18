#!/bin/sh
docker build -t registry.gitlab.com/meqqori/livraison-admin-app:latest ../
docker push registry.gitlab.com/meqqori/livraison-admin-app:latest

