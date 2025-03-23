# YouTube Downloader

This project provides a way to download YouTube videos using Docker and FastAPI.

## Prerequisites

Before running the project, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup Instructions

1. **Create the `.env` file**
   
   - Copy the contents of `.example.env` and create a new file named `.env`.
   - Paste all the contents from `.example.env` into `.env`.

2. **Run the application**
   
   - Open a terminal in the project directory and execute:
     ```sh
     docker compose up
     ```

3. **Access the FastAPI Docs**
   
   - Once the container is up, open your browser and navigate to:
     ```
     http://localhost:8000/docs
     ```
   - This will provide an interactive API interface where you can test the YouTube downloader.

4. **Or you can use UI**
   - Once the container is up, open your browser and navigate to:
     ```
     http://localhost:8000/
     ```
   - This will provide an interactive basic UI to test YouTube downloader.

5. **Read and understand `static/index.html`** 
   - This will provide you with the very clearly use endpoints for socket response and how they are working.
   - You can connect to socket via socket.io at `/socket.io` endpoint.
   - We will only have messages on channels like - `download_added`, `download_deleted`, and `progress_update`.
   - Specially focus on `progress_update` as all the progress and download information comes via this only.
   - Checkout the data from each channel in console first.


## Stopping the Application

To stop the application, press `Ctrl + C` in the terminal or run:
```sh
docker compose down
```

**Note:** on compose down, all the redis data will be deleted.


