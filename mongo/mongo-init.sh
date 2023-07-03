#!/bin/sh

set -e

mongo <<EOF
db = db.getSiblingDB("$MONGO_INITDB_DATABASE")

db.createUser({
  user: "$MONGO_INITDB_USERNAME",
  pwd: "$MONGO_INITDB_PASSWORD",
  roles: [
    {
      role: "readWrite",
      db: "$MONGO_INITDB_DATABASE",
    },
  ],
});

db.createCollection("about");
db.createCollection("contacts");
db.createCollection("positions");
db.createCollection("profiles");
db.createCollection("repositories");
db.createCollection("skills");
EOF
