# ✅ pricing.py
import math

def calculate_customer_price(supplier_price: float, commission_pct: float = 0.08, fixed_fee: float = 0.0, rounding: str = "ceil_rupee"):
    """Calculate customer-facing price with commission and fixed fee."""
    commission_amount = supplier_price * commission_pct + fixed_fee
    raw_price = supplier_price + commission_amount

    if rounding == "ceil_rupee":
        customer_price = math.ceil(raw_price)
    else:
        customer_price = round(raw_price, 2)

    return {
        "supplier_price": round(supplier_price, 2),
        "commission_amount": round(commission_amount, 2),
        "customer_price": customer_price
    }
