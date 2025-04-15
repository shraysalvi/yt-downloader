#!/bin/bash

# Target directory for the build
TARGET_DIR="/var/www/yt-downloader"

# Run the Vite build command
echo "Building the Vite project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "Build successful"
else
  echo "Build failed"
  exit 1
fi

# Move the dist folder to the target directory
echo "Moving build output to $TARGET_DIR..."
cp -r dist/* $TARGET_DIR/

# Set permissions for the target directory
echo "Changing permissions for $TARGET_DIR..."
sudo chown -R www-data:www-data $TARGET_DIR
sudo chmod -R 755 $TARGET_DIR

# Verify permissions
echo "Verifying permissions..."
ls -l $TARGET_DIR

echo "Build and permission update completed."