import os

from pydantic import BaseSettings


class Settings(BaseSettings):
    # APP
    APP_TITLE: str = "resuilder"
    APP_VERSION: str = "0.0.1"
    APP_DOCS_URL: str | None = "/"
    APP_REDOC_URL: str | None = None
    APP_ALLOW_ORIGINS: list[str] = ["http://127.0.0.1:3000", "http://localhost:3000"]
    APP_ALLOW_HEADERS: list[str] = ["Authorization"]
    APP_ALLOW_METHODS: list[str] = ["GET", "POST", "PUT", "DELETE"]

    # Auth0
    AUTH0_DOMAIN: str = os.getenv("DOMAIN", "")
    AUTH0_API_AUDIENCE: str = os.getenv("API_AUDIENCE", "")
    AUTH0_ISSUER: str = os.getenv("ISSUER", "")
    AUTH0_ALGORITHMS: str = os.getenv("ALGORITHMS", "")

    # DB
    DB_URI: str = os.getenv("DB_URI", "")


settings = Settings()
