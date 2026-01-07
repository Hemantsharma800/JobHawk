#!/bin/bash

echo "🚀 Setting up JobHawk..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker Desktop.${NC}"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed.${NC}"
    exit 1
fi

# Create necessary directories
echo -e "${YELLOW}📁 Creating directories...${NC}"
mkdir -p backend/uploads
mkdir -p logs

# Create environment file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}📄 Creating .env file...${NC}"
    cat > backend/.env << 'EOF'
DATABASE_URL=postgresql://jobhawk:jobhawk123@postgres/jobhawk
REDIS_URL=redis://redis:6379/0
SECRET_KEY=$(openssl rand -hex 32)
DEBUG=True
CELERY_BROKER_URL=redis://redis:6379/0
EOF
    echo -e "${GREEN}✅ Created .env file${NC}"
fi

# Build and start containers
echo -e "${YELLOW}🐳 Building and starting containers...${NC}"
docker-compose up --build -d

echo -e "${YELLOW}⏳ Waiting for services to start...${NC}"
sleep 10

# Check if services are running
if ! docker-compose ps | grep -q "Up"; then
    echo -e "${RED}❌ Services failed to start. Check logs with: docker-compose logs${NC}"
    exit 1
fi

# Run database migrations
echo -e "${YELLOW}📊 Running database migrations...${NC}"
docker-compose exec backend alembic upgrade head

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}🎉 JobHawk Setup Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${YELLOW}📊 Services Status:${NC}"
docker-compose ps
echo ""
echo -e "${YELLOW}🔗 Access Points:${NC}"
echo -e "Backend API: ${GREEN}http://localhost:8000${NC}"
echo -e "API Documentation: ${GREEN}http://localhost:8000/docs${NC}"
echo -e "PostgreSQL: ${GREEN}localhost:5432${NC}"
echo -e "Redis: ${GREEN}localhost:6379${NC}"
echo ""
echo -e "${YELLOW}📝 Useful Commands:${NC}"
echo -e "View logs: ${GREEN}docker-compose logs -f${NC}"
echo -e "Stop services: ${GREEN}docker-compose down${NC}"
echo -e "Restart services: ${GREEN}docker-compose restart${NC}"
echo -e "Check service status: ${GREEN}docker-compose ps${NC}"
echo ""
echo -e "${YELLOW}⚠️  First Time Setup:${NC}"
echo "1. Visit: http://localhost:8000/docs"
echo "2. Register a new user"
echo "3. Upload your resume"
echo "4. Configure job search criteria"
echo -e "${GREEN}=========================================${NC}"