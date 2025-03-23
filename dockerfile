FROM python:3.10-alpine AS base

WORKDIR /app

COPY requirements.txt ./

RUN apk add --update --virtual .build-deps gcc g++ musl-dev && \
    pip install --no-cache-dir -r requirements.txt && \
    apk del .build-deps && \
    rm -rf /var/cache/apk/* && \
    mkdir /.cache && chmod 777 /.cache

COPY . .

ENV UID=1000
ENV GID=1000
ENV UMASK=022

# === FastAPI Image ===
FROM base AS fastapi

# === Celery Image ===
FROM base AS celery
RUN apk add --update ffmpeg
