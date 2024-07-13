from pydantic import AnyUrl, HttpUrl, WebsocketUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_TITLE: str = "generator"
    APP_VERSION: str = "0.2.0"

    # CORS
    CORS_ALLOW_ORIGINS: list[str] = []
    CORS_ALLOW_HEADERS: list[str] = ["Authorization"]
    CORS_ALLOW_METHODS: list[str] = ["OPTIONS", "GET", "POST", "PUT", "DELETE"]
    CORS_ALLOW_CREDENTIALS: bool = True

    # Browser
    BROWSER_WS_URL: WebsocketUrl

    # Renderer
    RENDERER_HTTP_URL: HttpUrl

    # Auth0
    AUTH0_DOMAIN: str
    AUTH0_API_AUDIENCE: str
    AUTH0_ISSUER: str
    AUTH0_ALGORITHMS: list[str] = ["RS256"]

    # Cloudinaty
    CLOUDINARY_URL: AnyUrl


settings = Settings()  # type: ignore[call-arg]
