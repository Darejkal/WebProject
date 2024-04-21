#!/bin/bash
cd ./nextjs_server && npm run dev  &
cd ./go_server&& go run --mod=mod main.go &
cd ./notification && conda run -n annd python main.py &
wait