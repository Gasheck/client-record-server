#!/bin/bash

echo "$NODE_ENV"
echo "$POSTGRES_USER"

if [ ! -d /node_modules ]; then
    echo "Installing dependencies."
    echo ""
    yarn
fi

if [ "$NODE_ENV" == "production" ]; then
  echo "Building application."
  echo ""
  yarn build
fi

if [ "$NODE_ENV" != "production" ]; then
  echo "Starting application in dev mode."
  echo ""
  yarn serve
fi
