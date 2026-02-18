from utils import calculate_sum_assured

def test_sum_assured_low():
    assert calculate_sum_assured(10000) == 5000000

def test_sum_assured_high():
    assert calculate_sum_assured(600000) == 6000000
