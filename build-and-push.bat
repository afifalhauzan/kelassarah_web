@echo off
echo Building Docker image using Laravel Sail Dockerfile...
docker build -t afifalhauzan123/kelassarah-web:latest -f vendor/laravel/sail/runtimes/8.4/Dockerfile .

echo Pushing to Docker Hub...
docker push afifalhauzan123/kelassarah-web:latest

echo Build and push completed!
echo You can now run: docker compose up -d
pause