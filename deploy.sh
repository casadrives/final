#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Create necessary directories
echo "Creating directories..."
mkdir -p dist/errors
mkdir -p dist/css

# Copy error pages and styles
echo "Copying error pages and styles..."
cp public/errors/* dist/errors/
cp public/css/* dist/css/

# Copy configuration files
echo "Copying configuration files..."
cp .htaccess dist/
cp robots.txt dist/
cp -r public/.well-known dist/

# Set permissions
echo "Setting permissions..."
find dist -type d -exec chmod 755 {} \;
find dist -type f -exec chmod 644 {} \;

# Create gzip versions of static assets
echo "Creating gzip versions..."
find dist -type f -name "*.js" -exec gzip -9 -k {} \;
find dist -type f -name "*.css" -exec gzip -9 -k {} \;
find dist -type f -name "*.html" -exec gzip -9 -k {} \;

echo "Deployment package ready in dist/"