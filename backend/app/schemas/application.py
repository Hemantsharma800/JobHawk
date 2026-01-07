from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ApplicationBase(BaseModel):
    job_id: int
    resume_id: Optional[int] = None
    status: str = "not_applied"
    cover_letter_text: Optional[str] = None
    notes: Optional[str] = None
    next_followup: Optional[datetime] = None

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None
    next_followup: Optional[datetime] = None
    is_archived: Optional[bool] = None

class ApplicationResponse(ApplicationBase):
    id: int
    user_id: int
    applied_date: Optional[datetime] = None
    cover_letter_path: Optional[str] = None
    is_archived: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True