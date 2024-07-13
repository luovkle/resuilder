import io

import cloudinary.uploader  # type: ignore[import-untyped]
from fastapi import HTTPException
from playwright.async_api import async_playwright

from app.core.config import settings

cloudinary.config(secure=True)


async def render_pdf(user: str) -> bytes:
    async with async_playwright() as p:
        browser = await p.chromium.connect(str(settings.BROWSER_WS_URL))
        context = await browser.new_context(
            viewport={
                "width": 960,
                "height": 1080,
            }
        )
        page = await context.new_page()
        await page.goto(
            f"{settings.RENDERER_HTTP_URL}/resume/{user}",
            wait_until="networkidle",
        )
        pdf_content = await page.pdf(
            width="1300",
            height="900",
            landscape=True,
            print_background=True,
        )
        await browser.close()
        return pdf_content


async def upload_to_cloudinary(pdf_content: bytes, user: str) -> str:
    try:
        result = cloudinary.uploader.upload(
            io.BytesIO(pdf_content),
            folder="resumes/",
            resource_type="raw",
            public_id=user,
            override=True,
        )
        url = result.get("secure_url")
        if not url:
            raise HTTPException(
                status_code=500, detail="Failed to get URL from Cloudinary"
            )
        return url
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Cloudinary upload failed: {str(e)}"
        )


async def generate_resume(user: str):
    try:
        pdf_content = await render_pdf(user)
        url = await upload_to_cloudinary(pdf_content, user)
        return {"url": url}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to generate resume: {str(e)}"
        )
