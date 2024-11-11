#!/bin/bash

# Base directory
BASE_DIR="/home/casadrive/public_html"

# List of sensitive files
SENSITIVE_FILES=(
    ".env"
    "php.ini"
    ".htaccess"
    ".htaccess.cpanel"
    "config/auth.json"
    "config/database.php"
    ".well-known/security.txt"
    "pgp-key.txt"
    "composer.json"
    "package.json"
    "package-lock.json"
    "yarn.lock"
)

# Set restrictive permissions for sensitive files
echo "Setting restrictive permissions for sensitive files..."
for file in "${SENSITIVE_FILES[@]}"; do
    if [ -f "$BASE_DIR/$file" ]; then
        chmod 400 "$BASE_DIR/$file"
        echo "Set 400 permissions for $file"
    fi
done

# Set permissions for config directory
if [ -d "$BASE_DIR/config" ]; then
    chmod 500 "$BASE_DIR/config"
    find "$BASE_DIR/config" -type f -exec chmod 400 {} \;
    echo "Set 500 permissions for config directory and 400 for its files"
fi

# Protect keys directory if it exists
if [ -d "$BASE_DIR/config/keys" ]; then
    chmod 500 "$BASE_DIR/config/keys"
    find "$BASE_DIR/config/keys" -type f -exec chmod 400 {} \;
    echo "Set 500 permissions for keys directory and 400 for its files"
fi

echo "Sensitive files have been secured!"