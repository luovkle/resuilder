from pydantic import WebsocketUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    BROWSER_WS_URL: WebsocketUrl


settings = Settings()  # type: ignore[call-arg]
