from celery import Celery
from .core.config import settings

celery_app = Celery(
    "jobhawk",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.REDIS_URL,
    include=[
        "app.tasks.scraping_tasks",
        "app.tasks.email_tasks"
    ]
)

# Celery configuration
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,
    worker_max_tasks_per_child=100,
    worker_prefetch_multiplier=1,
)

# Periodic tasks
celery_app.conf.beat_schedule = {
    "scrape-jobs-every-6-hours": {
        "task": "app.tasks.scraping_tasks.scrape_all_jobs",
        "schedule": 21600.0,  # Every 6 hours
        "args": (),
    },
    "cleanup-old-jobs-daily": {
        "task": "app.tasks.scraping_tasks.cleanup_old_jobs",
        "schedule": 86400.0,  # Daily
        "args": (30,),  # Keep jobs for 30 days
    },
}

if __name__ == "__main__":
    celery_app.start()