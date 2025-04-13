#!/bin/bash

ng serve --host 0.0.0.0 --disable-host-check &
APP_PID=$!

trap "kill $APP_PID; exit" INT

sudo caddy reverse-proxy --from https://dev.taskzen.local --to http://localhost:4200

kill $APP_PID