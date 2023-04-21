#!/bin/bash

createdb linkbase

cd Front-End

echo "Creating Front-End environment variables..."

read -p "Enter your IP address (don't include http:// or port): " IP_ADDRESS

echo "IP_ADDRESS=http://$IP_ADDRESS:3001" > ../Front-End/.env
echo "Done!"

npm i

cd ../Back-End

echo "Creating Back-End environment variables..."

read -p "Enter your PostgreSQL username (or enter if null): " DB_USERNAME
read -p "Enter your PostgreSQL password (or enter if null): " DB_PASSWORD

echo "PORT=3001" > ../Back-End/.env
echo "DB_USERNAME=\"$DB_USERNAME\"" >> ../Back-End/.env
echo "DB_PASSWORD=\"$DB_PASSWORD\"" >> ../Back-End/.env
echo "DB_NAME=linkbase" >> ../Back-End/.env
echo "SECRET=secret" >> ../Back-End/.env
echo "Done!"

npm i

echo "Initializing server..."

npm start