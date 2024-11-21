from database import SessionLocal
from fastapi import Depends, HTTPException
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from models import User
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
SECRET_KEY = "SANJAYSINGHRAJAWAT"
ALGORITHM = "HS256"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    print("Token received:", token)
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        print("Decoded email:", email)
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token: missing email")
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        print("User authenticated:", user.email)
        return user
    except JWTError as e:
        print("JWT decoding error:", str(e))
        raise HTTPException(status_code=401, detail="Invalid token")

