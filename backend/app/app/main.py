from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.api_v1.api import api_router
from app.core.config import settings
from app.db.client import client

app = FastAPI(
    title=settings.APP_TITLE,
    version=settings.APP_VERSION,
    docs_url=settings.APP_DOCS_URL,
    redoc_url=settings.APP_REDOC_URL,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.APP_ALLOW_ORIGINS,
    allow_headers=settings.APP_ALLOW_HEADERS,
    allow_methods=settings.APP_ALLOW_METHODS,
)


@app.on_event("shutdown")
def shutdown_event():
    client.close()


app.include_router(api_router)
