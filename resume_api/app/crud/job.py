import cloudinary  # type: ignore[import-untyped]
import cloudinary.uploader  # type: ignore[import-untyped]
from fastapi import HTTPException, UploadFile, status
from pymongo.database import Database

from app.crud.resume import check_resume_exists
from app.schemas.job import JobCreate, JobDB, JobUpdate

cloudinary.config(secure=True)


def create_job(db: Database, user_id: str, job_data: JobCreate) -> dict:
    check_resume_exists(db, user_id)
    new_job = JobDB(**job_data.model_dump(by_alias=True), user_id=user_id)
    result = db.jobs.insert_one(new_job.model_dump(by_alias=True))
    doc = db.jobs.find_one({"_id": result.inserted_id})
    if not doc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve the created job",
        )
    return doc


def read_jobs(db: Database, user_id: str) -> list:
    check_resume_exists(db, user_id)
    docs = list(db.jobs.find({"user_id": user_id}))
    if not docs:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No jobs found for this user",
        )
    return docs


def update_job(db: Database, user_id: str, job_id: str, new_data: JobUpdate) -> dict:
    check_resume_exists(db, user_id)
    update_data = new_data.model_dump(exclude_none=True)
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No valid data provided for update",
        )
    result = db.jobs.update_one(
        {"_id": job_id, "user_id": user_id}, {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found",
        )
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No changes made to the job",
        )
    updated_doc = db.jobs.find_one({"_id": job_id, "user_id": user_id})
    if not updated_doc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve updated job",
        )
    return updated_doc


def delete_job(db: Database, user_id: str, job_id: str) -> dict:
    check_resume_exists(db, user_id)
    job = db.jobs.find_one({"_id": job_id, "user_id": user_id})
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found",
        )
    picture_id = job.get("picture_id")
    if picture_id:
        try:
            cloudinary.uploader.destroy(f"job_pictures/{picture_id}")
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to delete image from Cloudinary: {str(e)}",
            )
    result = db.jobs.delete_one({"_id": job_id, "user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found",
        )
    return {"msg": "Job and associated picture deleted successfully"}


def update_job_picture(
    db: Database, user_id: str, job_id: str, file: UploadFile
) -> dict:
    check_resume_exists(db, user_id)
    job = db.jobs.find_one({"_id": job_id, "user_id": user_id})
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found",
        )
    picture_id = job.get("picture_id")
    if not picture_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Job does not have a valid picture_id",
        )
    try:
        upload_result = cloudinary.uploader.upload(
            file.file, folder="job_pictures/", public_id=picture_id, overwrite=True
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload image to Cloudinary: {str(e)}",
        )
    picture_url = upload_result.get("secure_url")
    if not picture_url:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to obtain the image URL from Cloudinary",
        )
    result = db.jobs.update_one(
        {"_id": job_id, "user_id": user_id}, {"$set": {"picture_url": picture_url}}
    )
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found",
        )
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No changes made to the job",
        )
    updated_doc = db.jobs.find_one({"_id": job_id, "user_id": user_id})
    if not updated_doc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve updated job",
        )
    return updated_doc


def cleanup_jobs(db: Database, user_id: str) -> dict:
    jobs = list(db.jobs.find({"user_id": user_id}))
    if len(jobs) == 0:
        return {"msg": "No jobs found for the specified user"}
    for job in jobs:
        picture_id = job.get("picture_id")
        if picture_id:
            try:
                cloudinary.uploader.destroy(f"job_pictures/{picture_id}")
            except Exception as e:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Failed to delete image from Cloudinary: {str(e)}",
                )
    result = db.jobs.delete_many({"user_id": user_id})
    if result.deleted_count == 0:
        return {"msg": "No jobs found for the specified user"}
    return {"msg": f"All jobs and pictures for user {user_id} deleted successfully"}
