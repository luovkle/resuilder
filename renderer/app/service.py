from flask import abort, render_template
from pydantic import ValidationError
from pymongo.database import Database

from app.schemas import ContactMethod, Job, Profile, Project, Resume


def get_resume_by_nickname(db: Database, nickname: str) -> Resume:
    resume_obj = db.resumes.find_one({"nickname": nickname})
    if not resume_obj:
        abort(404)
    try:
        return Resume.model_validate(resume_obj)
    except ValidationError:
        abort(500)


def get_profile_by_user_id(db: Database, user_id: str) -> Profile:
    profile_obj = db.profiles.find_one({"user_id": user_id})
    if not profile_obj:
        abort(404)
    try:
        return Profile.model_validate(profile_obj)
    except ValidationError:
        abort(500)


def get_contact_methods_by_user_id(db: Database, user_id: str) -> list[ContactMethod]:
    contact_methods_objs = list(db.contact_methods.find({"user_id": user_id}))
    try:
        return [
            ContactMethod.model_validate(contact_method_obj)
            for contact_method_obj in contact_methods_objs
        ]
    except ValidationError:
        abort(500)


def get_jobs_by_user_id(db: Database, user_id: str) -> list[Job]:
    jobs_objs = list(db.jobs.find({"user_id": user_id}))
    try:
        return [Job.model_validate(job_obj) for job_obj in jobs_objs]
    except ValidationError:
        abort(500)


def get_projects_by_user_id(db: Database, user_id: str) -> list[Project]:
    projects_objs = list(db.projects.find({"user_id": user_id}))
    try:
        return [Project.model_validate(project_obj) for project_obj in projects_objs]
    except ValidationError:
        abort(500)


def render_resume(db: Database, nickname: str) -> str:
    resume = get_resume_by_nickname(db, nickname)
    if not resume.public:
        abort(404)
    profile = get_profile_by_user_id(db, resume.user_id)
    contact_methods = get_contact_methods_by_user_id(db, resume.user_id)
    jobs = get_jobs_by_user_id(db, resume.user_id)
    projects = get_projects_by_user_id(db, resume.user_id)
    return render_template(
        "resume.html",
        profile=profile,
        contact_methods=contact_methods,
        jobs=jobs,
        projects=projects,
    )
