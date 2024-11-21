from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

# User Model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    # username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class History(Base):
    __tablename__ = "histories"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    model = Column(String, nullable=False)
    input_type = Column(String, nullable=False)
    input_text = Column(Text, nullable=True)
    summary = Column(Text, nullable=False)
    user = relationship("User", back_populates="history")

User.history = relationship("History", back_populates="user", cascade="all, delete-orphan")

