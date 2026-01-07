from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="JobHawk API")

# CORS - allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "https://hemantsharma800.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "JobHawk API is running!"}

# ADD THESE ENDPOINTS:
@app.get("/api/auth/login")
def login():
    return {"message": "Login endpoint", "user": "mock", "token": "mock_token"}

@app.get("/api/jobs")
def get_jobs():
    return {
        "jobs": [
            {"id": 1, "title": "Frontend Developer", "company": "Tech Corp"},
            {"id": 2, "title": "Backend Engineer", "company": "Startup Inc"}
        ],
        "count": 2
    }

@app.get("/api/scrapers/test")
def test_scrapers():
    return {"status": "scrapers ready"}

@app.get("/health")
def health():
    return {"status": "healthy"}

# Fix favicon 404
@app.get("/favicon.ico")
def favicon():
    return {}