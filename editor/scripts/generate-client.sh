#!/usr/bin/env sh

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

pnpm openapi-generator-cli generate \
  -i $EDITOR_API_URL/openapi.json \
  -g typescript-axios \
  -o ./src/services/api/
