from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # APP
    APP_TITLE: str = "resuilder"
    APP_VERSION: str = "0.2.0"
    APP_DOCS_URL: str = "/"
    APP_REDOC_URL: str | None = None
    APP_ALLOW_ORIGINS: list[str] = []
    APP_ALLOW_HEADERS: list[str] = ["Authorization"]
    APP_ALLOW_METHODS: list[str] = ["OPTIONS", "GET", "POST", "PUT", "DELETE"]

    # Scraper
    # By default a github page contains 30 repositories.
    SCRAPER_REPOSITORY_LIMIT: int = 10

    # Auth0
    AUTH0_DOMAIN: str
    AUTH0_API_AUDIENCE: str
    AUTH0_ISSUER: str
    AUTH0_ALGORITHMS: str = "RS256"

    # Cloudinary
    CLOUDINARY_URL: str

    # DB
    DB_URI: str


settings = Settings()  # type: ignore
