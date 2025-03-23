import asyncio
import json
from contextlib import asynccontextmanager
import socketio
import uvicorn
from aioredis import Redis
from app.clients import SOCKET_CLIENT, get_redis
from app.constants import DOWNLOAD_URL, DOWNLOAD_DIRECTORY
from app.utils import periodic_cleanup
from app.video import router as video_router
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from starlette.staticfiles import StaticFiles
from fastapi.responses import FileResponse

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manages the lifespan of the FastAPI application.

    This context manager initializes the Redis client and Socket.IO client, 
    starts background tasks for listening to Redis messages and performing 
    periodic cleanup, and ensures that resources are properly closed when 
    the application shuts down.

    Args:
        app (FastAPI): The FastAPI application instance.
    """

    app.state.redis = await get_redis()
    app.state.sio = SOCKET_CLIENT
    asyncio.create_task(redis_listener(app.state.redis, app.state.sio))
    asyncio.create_task(periodic_cleanup(app.state.redis))

    yield  # The app runs here

    await app.state.redis.close()


app = FastAPI(
    lifespan=lifespan,
    title="YouTube Downloader API",
    description="API for downloading YouTube videos and shorts",
    version="1.0.0",
)


app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/socket.io", socketio.ASGIApp(SOCKET_CLIENT, app))
app.include_router(video_router)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Configure Trusted Host
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])


# Socket.IO event handlers.
@SOCKET_CLIENT.event
async def connect(sid, environ):
    await SOCKET_CLIENT.emit("welcome", {"message": "Welcome!"}, room=sid)


# Health Check
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "youtube-downloader"
    }


@app.get(DOWNLOAD_URL+"/{file_path:path}")
async def download_file(file_path: str):
    return FileResponse(path=f"{DOWNLOAD_DIRECTORY}/{file_path}", filename=file_path)


# Homepage
@app.get("/", response_class=HTMLResponse)
async def serve_index():
    with open("static/index.html", "r") as file:
        return HTMLResponse(content=file.read())


# Error handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "detail": exc.detail,
        }
    )


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc)
        }
    )

async def redis_listener(redis_client: Redis, sio: socketio.AsyncServer):
    pubsub = redis_client.pubsub()
    await pubsub.subscribe("download_progress", "download_complete")
    async for message in pubsub.listen():
        if message["type"] == "message":
            try:
                data = json.loads(message["data"])
                await sio.emit("progress_update", data)
            except Exception as e:
                print(f"Progress update error: {e}")


if __name__ == "__main__":

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        workers=4,
        forwarded_allow_ips="*"
    )
