from enum import Enum
from pydantic import BaseModel

class PremiumFrequency(str, Enum):
    yearly = "Yearly"
    half_yearly = "Half-Yearly"
    monthly = "Monthly"
class RegisterSchema(BaseModel):
    name: str
    email: str
    password: str

class LoginSchema(BaseModel):
    email: str
    password: str

class PolicyType(str, Enum):
    term = "Term Life Insurance"
    general = "General Insurance"
    health = "Health Insurance"
    travel = "Travel Insurance"

class PaymentOption(str, Enum):
    phonepe = "PhonePe"
    gpay = "GPay"
    netbanking = "NetBanking"

class RidersEnum(int, Enum):
    one = 1
    two = 2
    three = 3
    four = 4
    five = 5
    six = 6
    seven = 7
    eight = 8
    nine = 9
    ten = 10
#Riders simple int rehne do (1–10)

# class InputSchema(BaseModel):
#     ppt: int
#     pt: int
#     premium: int
#     age: int
#     frequency: PremiumFrequency
#     token: str

class InputSchema(BaseModel):
    ppt: int
    pt: int
    premium: int
    age: int
    frequency: str
    sum_assured: float
    
    policy_type: str
    payment_option: str
    riders: int
    
    token: str
