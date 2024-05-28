#!/usr/bin/env sh

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

pnpm openapi-generator-cli generate \
  -i $VITE_EDITOR_API_HTTP_URL/openapi.json \
  -g typescript-axios \
  -o ./src/services/api/

pnpm openapi-generator-cli generate \
  -i $VITE_GENERATOR_HTTP_URL/openapi.json \
  -g typescript-axios \
  -o ./src/services/generatorApi/
