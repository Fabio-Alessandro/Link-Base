#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

cd Back-End

echo "${BLUE}Seeding database...${NC}"

npm run seed

echo "${GREEN}Done!${NC}"

cd ../Front-End

echo "${BLUE}Creating Front-End environment variables...${NC}"

read -p "Enter your IP address (don't include http:// or port #): " IP_ADDRESS

echo "IP_ADDRESS=http://$IP_ADDRESS:3001" > ./.env
echo "${GREEN}Done!${NC}"

echo "${BLUE}Installing Front-End dependencies${NC}"

npm i

echo "${GREEN}Done!${NC}"

npx expo start