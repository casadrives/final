#!/bin/bash

# Base directory
BASE_DIR="/home/casadrive/public_html"

# Set directory permissions (755)
echo "Setting directory permissions to 755..."
find "$BASE_DIR" -type d -exec chmod 755 {} \;

# Set file permissions (644)
echo "Setting file permissions to 644..."
find "$BASE_DIR" -type f -exec chmod 644 {} \;

# Set specific permissions for sensitive files (400)
echo "Setting sensitive file permissions to 400..."
chmod 400 "$BASE_DIR/.env"
chmod 400 "$BASE_DIR/php.ini"
chmod 400 "$BASE_DIR/.htaccess.cpanel"

# Set permissions for writable directories
echo "Setting writable directory permissions..."
chmod 775 "$BASE_DIR/cache"
chmod 775 "$BASE_DIR/logs"
chmod 775 "$BASE_DIR/tmp"

# Set permissions for writable files
echo "Setting writable file permissions..."
find "$BASE_DIR/logs" -type f -exec chmod 664 {} \;
find "$BASE_DIR/cache" -type f -exec chmod 664 {} \;

# Set ownership if needed (replace 'casadrive' with your cPanel username)
echo "Setting ownership..."
chown -R casadrive:casadrive "$BASE_DIR"

echo "Permissions have been set successfully!"