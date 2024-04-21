#!/bin/bash
cd ./nextjs_server && npm run dev  &
echo $(pwd)
cd ./go_server&& go run --mod=mod main.go &
wait