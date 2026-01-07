cat > app/schemas/__init__.py << 'EOF'
# Pydantic schemas
from .user import UserCreate, UserLogin, UserResponse, Token
from .job import JobCreate, JobResponse, JobSearchCreate, JobSearchResponse
from .application import ApplicationCreate, ApplicationResponse

__all__ = [
    'UserCreate', 'UserLogin', 'UserResponse', 'Token',
    'JobCreate', 'JobResponse', 'JobSearchCreate', 'JobSearchResponse',
    'ApplicationCreate', 'ApplicationResponse'
]
EOF