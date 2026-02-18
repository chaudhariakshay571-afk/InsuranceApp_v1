def calculate_age(birth_year, current_year):
    return current_year - birth_year

def calculate_sum_assured(premium):
    sa = premium * 10
    return sa if sa > 5000000 else 5000000



def generate_table(ppt, pt, premium, sum_assured):
    rows = []
    bonus_rate = 0.025

    total_bonus = 0

    for year in range(1, pt+1):
        prem = premium if year <= ppt else 0
        sa = sum_assured if year == pt else 0

        bonus_amount = bonus_rate * sum_assured
        total_bonus += bonus_amount

        total_benefit = sum_assured + total_bonus if year == pt else 0


        if year <= ppt:
            net_cash = -prem          
        elif year == pt:
            net_cash = total_benefit  
        else:
            net_cash = 0             


        rows.append({
            "policy_year": year,
            "premium": prem,
            "sum_assured": sa,
            "bonus_rate": bonus_rate,
            "bonus_amount": bonus_amount,
            "total_benefit": total_benefit,
            "net_cashflow": net_cash
        })

        bonus_rate += 0.005

    return rows
