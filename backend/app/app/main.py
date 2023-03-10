from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.api.api_v1.api import api_router

load_dotenv()

app = FastAPI(title="resuilder", version="0.0.1", docs_url="/", redoc_url=None)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000", "http://localhost:3000"],
    allow_headers=["Authorization"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
)
app.include_router(api_router)
