#!/bin/bash
set -e

echo "Installing dependencies..."
npm install

echo "Building Next.js app..."
npm run build

echo "Copying public folder..."
cp -r public .next/standalone/public

echo "Copying static files..."
cp -r .next/static .next/standalone/.next/static

echo "Verifying CSS files..."
find .next/standalone/.next/static/css -type f -name "*.css" || echo "Warning: No CSS files found!"

echo "Build complete!"
