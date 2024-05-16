#!/usr/bin/env sh

set -e
set -x

autoflake --in-place .
black .
isort .
