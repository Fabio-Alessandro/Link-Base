#!/bin/bash

cd Back-End

echo "Seeding database..."

npm run seed

echo "Done!"

cd ../Front-End

echo "Initializing React Native development server..."

npx expo start