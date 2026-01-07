# JobHawk - Intelligent Job Application Tracker

An automated job aggregator that collects job listings, matches them with your resume, and helps you track applications.

## Features
- **Smart Job Discovery**: Automatic scraping from LinkedIn, Indeed, and company career pages
- **Resume Matching**: AI-powered job-resume compatibility scoring
- **Application Tracking**: Manual application workflow with status tracking
- **Dashboard**: Clean interface to manage your job search

## Quick Start

```bash
# Clone the repository
git clone https://github.com/hemantsharma800/jobhawk.git
cd jobhawk

# Start with Docker (recommended)
docker-compose up -d

# Or run locally
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload