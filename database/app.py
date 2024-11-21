from fastapi import FastAPI, Depends, HTTPException
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
# from models import User, SessionLocal
from database import SessionLocal

app = FastAPI()

# Password Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT Config
SECRET_KEY = "SANJAYSINGHRAJAWAT"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Helper Functions
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Sign-Up
@app.post("/sign-up")
def sign_up(email: str, password: str, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(password)
    user = User(email=email, hashed_password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"msg": "User created successfully!"}

# Login
@app.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

    
