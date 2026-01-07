import os
import hashlib
from typing import Optional
from fastapi import UploadFile

def save_upload_file(upload_file: UploadFile, upload_dir: str) -> Optional[str]:
    """Save uploaded file and return file path"""
    try:
        # Create upload directory if it doesn't exist
        os.makedirs(upload_dir, exist_ok=True)
        
        # Generate unique filename
        file_extension = os.path.splitext(upload_file.filename)[1]
        file_hash = hashlib.md5(upload_file.filename.encode()).hexdigest()[:8]
        filename = f"{file_hash}_{upload_file.filename}"
        file_path = os.path.join(upload_dir, filename)
        
        # Save file
        with open(file_path, "wb") as buffer:
            content = upload_file.file.read()
            buffer.write(content)
        
        return file_path
    except Exception as e:
        print(f"Error saving file: {e}")
        return None

def get_file_extension(filename: str) -> str:
    """Get file extension"""
    return os.path.splitext(filename)[1].lower()

def is_allowed_file(filename: str, allowed_extensions: list) -> bool:
    """Check if file extension is allowed"""
    return get_file_extension(filename) in allowed_extensions

def delete_file(file_path: str) -> bool:
    """Delete file from filesystem"""
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
    except Exception as e:
        print(f"Error deleting file: {e}")
    return False