from pydantic import AnyUrl, HttpUrl, WebsocketUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Browser
    BROWSER_WS_URL: WebsocketUrl

    # Renderer
    RENDERER_HTTP_URL: HttpUrl

    # Cloudinaty
    CLOUDINARY_URL: AnyUrl


settings = Settings()  # type: ignore[call-arg]
