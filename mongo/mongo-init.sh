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

db.createCollection("resumes");
db.createCollection("profiles");
db.createCollection("contact_methods");
db.createCollection("jobs");
db.createCollection("projects");
EOF
