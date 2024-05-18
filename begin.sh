#!/bin/bash
cd ./template_server && npm run dev  &
cd ./nodejs_server && npm start &
wait