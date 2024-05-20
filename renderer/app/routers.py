from flask import Blueprint

from app.db import db
from app.service import render_resume

bp = Blueprint("resume", __name__, url_prefix="/resume")


@bp.route("/<nickname>")
def profile(nickname: str):
    return render_resume(db, nickname)
