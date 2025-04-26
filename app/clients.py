import os
import socketio
from aioredis import Redis, from_url
from aioredis.connection import ConnectionPool

# Global connection pool
_redis_pool = None

async def get_redis() -> Redis:
    """
    Return a Redis client instance with connection pooling.
    
    This function maintains a persistent connection pool to Redis,
    which is more efficient than creating new connections for each request.
    """
    global _redis_pool
    
    if _redis_pool is None:
        _redis_pool = ConnectionPool.from_url(
            os.environ.get("REDIS_URL", "redis://localhost:6379/1"),
            decode_responses=True,
            max_connections=10,
            socket_timeout=20,
            socket_connect_timeout=20,
            retry_on_timeout=True
        )
    return Redis(connection_pool=_redis_pool)

async def close_redis_pool():
    """Close the Redis connection pool when the application shuts down."""
    global _redis_pool
    if _redis_pool:
        await _redis_pool.disconnect()
        _redis_pool = None

SOCKET_CLIENT = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',
    engineio_logger=False
)
