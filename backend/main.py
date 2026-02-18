from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
from models import User, InsuranceInput
from utils import calculate_sum_assured
from auth import create_token, verify_token
from sqlalchemy.orm import Session
from schemas import PremiumFrequency
from schemas import RegisterSchema
from schemas import LoginSchema
from schemas import InputSchema
from utils import generate_table
from models import FinalOutput
from schemas import PolicyType
from schemas import PaymentOption
from schemas import RidersEnum
from typing import List
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/register")
def register(user: RegisterSchema, db: Session = Depends(get_db)):
    new_user = User(
        name=user.name,
        email=user.email,
        password=user.password
    )
    db.add(new_user)
    db.commit()
    return {"msg": "registered"}



@app.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or user.password != data.password:
        raise HTTPException(400, "Invalid")

    token = create_token(user.id)
    return {"token": token}


@app.post("/input")
def input_data(data: InputSchema, db: Session = Depends(get_db)):

    token_data = verify_token(data.token)

    if data.ppt < 5 or data.ppt > 10:
        raise HTTPException(400,"PPT invalid")

    if data.pt <= data.ppt:
        raise HTTPException(400,"PT invalid")

    if data.premium < 10000 or data.premium > 50000:
        raise HTTPException(400,"Premium invalid")

    if data.age < 23 or data.age > 56:
        raise HTTPException(400,"Age invalid")

    sa = calculate_sum_assured(data.premium)

   

    row = InsuranceInput(
    user_id=token_data["user_id"],
    ppt=data.ppt,
    pt=data.pt,
    premium=data.premium,
    age=data.age,
    sum_assured=data.sum_assured,
    frequency=data.frequency,

    policy_type=data.policy_type,
    payment_option=data.payment_option,
    riders=data.riders
    )


    db.add(row)
    db.commit()

    return {"sum_assured": sa}

@app.post("/calculate")
def calculate(data: InputSchema, db: Session = Depends(get_db)):

    rows = generate_table(data.ppt, data.pt, data.premium, data.sum_assured)

    for r in rows:
        db.add(FinalOutput(**r))

    db.commit()

    return rows


class TableRow(BaseModel):
    policy_year: int
    premium: float
    sum_assured: float
    bonus_rate: float
    bonus_amount: float
    total_benefit: float
    net_cashflow: float


@app.post("/save-table")
def save_table(rows: List[TableRow], db: Session = Depends(get_db)):
    for r in rows:
        db.add(FinalOutput(**r.dict()))
    db.commit()
    return {"msg": "saved"}