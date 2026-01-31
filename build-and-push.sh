#!/bin/bash

# Build and push to Docker Hub
echo "Building Docker image..."
docker build -t afifalhauzan123/kelassarah-web:latest .

echo "Pushing to Docker Hub..."
docker push afifalhauzan123/kelassarah-web:latest

echo "Build and push completed!"
echo "You can now run: docker compose up -d"