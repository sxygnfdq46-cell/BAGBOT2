"""
Authentication endpoints for BagBot
Simple in-memory authentication for demo purposes
"""
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timedelta
import secrets
import hashlib

router = APIRouter(prefix="/auth", tags=["auth"])

# In-memory user storage (replace with database in production)
users_db = {}
reset_tokens = {}

# Default test user
DEFAULT_USER = {
    "id": "user_default_001",
    "email": "test@bagbot.com",
    "password": hashlib.sha256("password123".encode()).hexdigest(),
    "name": "Test User",
    "role": "user",
    "created_at": datetime.utcnow().isoformat(),
}

# Default admin user
DEFAULT_ADMIN = {
    "id": "admin_default_001",
    "email": "admin@bagbot.com",
    "password": hashlib.sha256("admin123".encode()).hexdigest(),
    "name": "Admin User",
    "role": "admin",
    "created_at": datetime.utcnow().isoformat(),
}

# Initialize with default users
users_db["test@bagbot.com"] = DEFAULT_USER
users_db["admin@bagbot.com"] = DEFAULT_ADMIN


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str
    created_at: str
    last_login: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: int


class AuthResponse(BaseModel):
    user: UserResponse
    tokens: TokenResponse


def hash_password(password: str) -> str:
    """Hash password using SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()


def generate_token() -> str:
    """Generate a random token"""
    return secrets.token_urlsafe(32)


@router.post("/register", response_model=AuthResponse)
async def register(request: RegisterRequest):
    """Register a new user"""
    email_lower = request.email.lower()
    
    # Check if user already exists
    if email_lower in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_id = f"user_{secrets.token_hex(8)}"
    hashed_password = hash_password(request.password)
    
    user = {
        "id": user_id,
        "email": email_lower,
        "password": hashed_password,
        "name": request.name,
        "role": "user",
        "created_at": datetime.utcnow().isoformat(),
        "last_login": datetime.utcnow().isoformat(),
    }
    
    users_db[email_lower] = user
    
    # Generate tokens
    access_token = generate_token()
    refresh_token = generate_token()
    
    return AuthResponse(
        user=UserResponse(
            id=user["id"],
            email=user["email"],
            name=user["name"],
            role=user["role"],
            created_at=user["created_at"],
            last_login=user.get("last_login"),
        ),
        tokens=TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=3600,
        ),
    )


@router.post("/login", response_model=AuthResponse)
async def login(request: LoginRequest):
    """Login with email and password"""
    email_lower = request.email.lower()
    
    # Check if user exists
    if email_lower not in users_db:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    user = users_db[email_lower]
    hashed_password = hash_password(request.password)
    
    # Verify password
    if user["password"] != hashed_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Update last login
    user["last_login"] = datetime.utcnow().isoformat()
    
    # Generate tokens
    access_token = generate_token()
    refresh_token = generate_token()
    
    return AuthResponse(
        user=UserResponse(
            id=user["id"],
            email=user["email"],
            name=user["name"],
            role=user["role"],
            created_at=user["created_at"],
            last_login=user.get("last_login"),
        ),
        tokens=TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=3600,
        ),
    )


@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    """Request password reset"""
    email_lower = request.email.lower()
    
    # Generate reset token (even if user doesn't exist for security)
    reset_token = generate_token()
    
    if email_lower in users_db:
        # Store reset token with expiration
        reset_tokens[reset_token] = {
            "email": email_lower,
            "expires_at": datetime.utcnow() + timedelta(hours=1),
        }
    
    return {"message": "If the email exists, a reset link has been sent"}


@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    """Reset password with token"""
    # Check if token exists and is valid
    if request.token not in reset_tokens:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    token_data = reset_tokens[request.token]
    
    # Check if token is expired
    if datetime.utcnow() > token_data["expires_at"]:
        del reset_tokens[request.token]
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reset token has expired"
        )
    
    email = token_data["email"]
    
    # Update password
    if email in users_db:
        users_db[email]["password"] = hash_password(request.password)
    
    # Delete used token
    del reset_tokens[request.token]
    
    return {"message": "Password reset successful"}


@router.get("/validate")
async def validate_token():
    """Validate access token (simplified for demo)"""
    # In production, verify JWT token here
    return {"valid": True}
