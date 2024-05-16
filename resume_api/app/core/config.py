from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_TITLE: str = "resume_api"
    APP_VERSION: str = "0.2.0"

    # CORS
    CORS_ALLOW_ORIGINS: list[str] = []
    CORS_ALLOW_HEADERS: list[str] = ["Authorization"]
    CORS_ALLOW_METHODS: list[str] = ["OPTIONS", "GET", "POST", "PUT", "DELETE"]
    CORS_ALLOW_CREDENTIALS: bool = True

    # Scraper
    # By default a github page contains 30 repositories.
    SCRAPER_REPOSITORY_LIMIT: int = 10

    # MongoDB
    DB_URI: str
    DB_NAME: str

    # Auth0
    AUTH0_DOMAIN: str
    AUTH0_API_AUDIENCE: str
    AUTH0_ISSUER: str
    AUTH0_ALGORITHMS: list[str] = ["RS256"]

    # Cloudinary
    CLOUDINARY_URL: str


settings = Settings()  # type: ignore
