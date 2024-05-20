from flask import Blueprint

from app.service import render_resume
from app.db import db

bp = Blueprint("resume", __name__, url_prefix="/resume")


@bp.route("/<nickname>")
def profile(nickname: str):
    return render_resume(db, nickname)
