#!/bin/bash
# This script is used to build the project and copy the build to the remote server
build_dirname="dist"
remote_dirname="html"
directory="/home/dreamsky/meter_reader/web"

yarn build:ci
echo "Build completed."

# Copy the build to the remote server
echo "Copying the build to the remote server..."
sftp dreamsky@192.168.1.21 << EOF
cd $directory
put -r $build_dirname __build_temp
EOF
echo "Copy completed."

# Clean up
echo "Cleaning up..."
rm -r $build_dirname
echo "Clean up completed."

# Run the service on the remote server
echo "602946" | ssh dreamsky@192.168.1.21 "cp -r ${directory}/__build_temp ${directory}/${remote_dirname}"
echo "602946" | ssh dreamsky@192.168.1.21 "rm -r ${directory}/__build_temp"
