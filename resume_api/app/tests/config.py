from pydantic_settings import BaseSettings


class TestSettings(BaseSettings):
    # MongoDB
    TEST_DB_URI: str
    TEST_DB_NAME: str


test_settings = TestSettings()  # type: ignore
