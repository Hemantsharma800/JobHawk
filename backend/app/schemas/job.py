from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime

class JobSearchBase(BaseModel):
    name: str
    keywords: List[str]
    locations: Optional[List[str]] = None
    is_remote: Optional[bool] = False
    min_salary: Optional[int] = None
    max_salary: Optional[int] = None
    experience_level: Optional[str] = None

class JobSearchCreate(JobSearchBase):
    pass

class JobSearchResponse(JobSearchBase):
    id: int
    user_id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class ScrapedJobBase(BaseModel):
    portal_name: str
    title: str
    company: Optional[str] = None
    location: Optional[str] = None
    job_url: str
    apply_url: Optional[str] = None

class ScrapedJobResponse(ScrapedJobBase):
    id: int
    job_search_id: Optional[int] = None
    company_url: Optional[str] = None
    is_remote: Optional[bool] = None
    salary_text: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    posted_date: Optional[datetime] = None
    scraped_date: datetime
    is_active: bool
    match_score: Optional[float] = None
    
    class Config:
        from_attributes = True

class JobMatchRequest(BaseModel):
    resume_id: int

class JobMatchResponse(BaseModel):
    job_id: int
    resume_id: int
    match_score: float
    matched_skills: List[str]