from fastapi import FastAPI

from app.api.api_v1.api import api_router

app = FastAPI(title="resuilder", version="0.0.1", docs_url="/", redoc_url=None)
app.include_router(api_router)
