from fastapi import APIRouter, Depends, HTTPException
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate, Token
from database import SessionLocal
from dependencies import get_db
from schemas import LoginRequest

# Router
router = APIRouter()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT configuration
SECRET_KEY = "SANJAYSINGHRAJAWAT"  # Replace with your .env variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Helper functions
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Sign-up
@router.post("/sign-up", response_model=Token)
def sign_up(user: UserCreate, db: Session = Depends(get_db)):
    print("Hit sign-up")
    existing_user = get_user_by_email(db, user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(user.password)
    new_user = User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(data={"sub": new_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# Login
@router.post("/login", response_model=Token)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    print("Hit Login")
    user = get_user_by_email(db, credentials.email)
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
