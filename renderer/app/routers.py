from flask import Blueprint, render_template

from app.service import get_user_data
from app.db import db


bp = Blueprint("resume", __name__, url_prefix="/resume")


@bp.route("/<nickname>")
def profile(nickname: str):
    user_data = get_user_data(db, nickname)
    return render_template(
        "resume.html",
        profile=user_data["profile"],
        contacts=user_data["contacts"],
        about=user_data["about"],
        skills=user_data["skills"],
        positions=user_data["positions"],
        repositories=user_data["repositories"],
    )
