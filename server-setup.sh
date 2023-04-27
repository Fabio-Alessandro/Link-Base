#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

createdb linkbase

cd Back-End

echo "${BLUE}Creating Back-End environment variables...${NC}"

read -p "Enter your PostgreSQL username (press enter if null): " DB_USERNAME
read -p "Enter your PostgreSQL password (press enter if null): " DB_PASSWORD

echo "PORT=3001" > ./.env
echo "DB_USERNAME=\"$DB_USERNAME\"" >> ./.env
echo "DB_PASSWORD=\"$DB_PASSWORD\"" >> ./.env
echo "DB_NAME=linkbase" >> ./.env
echo "SECRET=secret" >> ./.env
echo "${GREEN}Done!${NC}"
echo "${BLUE}Installing Back-End dependencies${NC}"

npm i

echo "${GREEN}Done!${NC}"

npm start