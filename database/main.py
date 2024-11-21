from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import List
from auth import router as auth_router
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from models import History, User
from schemas import HistoryCreate, HistoryResponse
from dependencies import get_db, get_current_user
import logging

# Initialize app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this for your frontend origin if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_main():
    return {"msg": "Hello World"}

@app.post("/save-report", response_model=HistoryResponse)
def save_report(report: HistoryCreate, db: Session = Depends(get_db)):
    print("Report received:", report.dict())

    # Check if the user exists in the database (optional)
    user = db.query(User).filter(User.id == report.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_history = History(
        user_id=report.user_id,
        model=report.model,
        input_type=report.input_type,
        input_text=report.input_text,
        summary=report.summary,
    )
    
    db.add(new_history)
    db.commit()
    db.refresh(new_history)

    return new_history

# Get User History
@app.get("/history", response_model=List[HistoryResponse])
def get_history(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    history = db.query(History).filter(History.user_id == user.id).all()
    if not history:
        raise HTTPException(status_code=404, detail="No analysis history found")
    return history

# Clear History
@app.delete("/clear-history")
def clear_history(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    db.query(History).filter(History.user_id == user.id).delete()
    db.commit()
    return {"msg": "History cleared successfully"}

# Create database tables
Base.metadata.create_all(bind=engine)

# Register routes
app.include_router(auth_router, prefix="/auth", tags=["auth"])
