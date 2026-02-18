from sqlalchemy import Column, Integer, String, Numeric, ForeignKey
from database import Base
from enum import Enum
from pydantic import BaseModel

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)

class InsuranceInput(Base):
    __tablename__ = "insurance_input"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    ppt = Column(Integer)
    pt = Column(Integer)
    premium = Column(Numeric)
    frequency = Column(String(20))
    sum_assured = Column(Numeric)
    age = Column(Integer)
    policy_type = Column(String)
    payment_option = Column(String)
    riders = Column(Integer)
    sum_assured = Column(Integer)


class FinalOutput(Base):
    __tablename__ = "final_output"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    policy_year = Column(Integer)
    premium = Column(Numeric)
    sum_assured = Column(Numeric)
    bonus_rate = Column(Numeric)
    bonus_amount = Column(Numeric)
    total_benefit = Column(Numeric)
    net_cashflow = Column(Numeric)