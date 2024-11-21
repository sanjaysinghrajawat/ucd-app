from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserCreate(BaseModel):
    # username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    # username: str
    email: str
    created_at: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str


class LoginRequest(BaseModel):
    email: str
    password: str

class HistoryCreate(BaseModel):
    model: str
    input_type: str
    input_text: Optional[str] = None
    summary: str
    user_id: int  # Include user_id in the request to associate the report

class HistoryResponse(BaseModel):
    date: Optional[datetime] = None  # Make sure this matches the optional nature of your field
    model: Optional[str] = None
    input_type: Optional[str] = None
    input_text: Optional[str] = None
    summary: Optional[str] = None

    class Config:
        orm_mode = True