#!/usr/bin/env bash
set -e
GREEN='\e[32m'
ENDC='\e[0m'

echo -e "$GREEN - Install npm dependencies.. $ENDC"
bash -c "npm install --silent --unsafe-perm"

