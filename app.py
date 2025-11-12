# ✅ FINAL FIXED app.py — Direct path import method
import sys, os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))  # <- Fix import path

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pricing import calculate_customer_price
from stock_checker import check_meesho_stock
import json, uuid

app = FastAPI(title="Ecom-AI Checkout System")

ORDERS_FILE = "data/orders.json"
os.makedirs("data", exist_ok=True)
if not os.path.exists(ORDERS_FILE):
    with open(ORDERS_FILE, "w") as f:
        json.dump([], f)

class CheckoutRequest(BaseModel):
    product_id: str
    product_url: str
    supplier_price: float
    qty: int = 1
    commission_pct: float = 0.08
    fixed_fee: float = 0.0

@app.post("/checkout")
def checkout(req: CheckoutRequest):
    pricing = calculate_customer_price(req.supplier_price, req.commission_pct, req.fixed_fee)
    total = pricing["customer_price"] * req.qty

    in_stock = check_meesho_stock(req.product_url)
    if not in_stock:
        raise HTTPException(status_code=409, detail="Product out of stock at supplier")

    order = {
        "id": str(uuid.uuid4()),
        "product_id": req.product_id,
        "product_url": req.product_url,
        "qty": req.qty,
        "supplier_price": req.supplier_price,
        "customer_price": pricing["customer_price"],
        "commission_amount": pricing["commission_amount"],
        "status": "pending_payment"
    }

    with open(ORDERS_FILE, "r+", encoding="utf-8") as f:
        orders = json.load(f)
        orders.append(order)
        f.seek(0)
        json.dump(orders, f, ensure_ascii=False, indent=4)

    return {
        "message": "Order created successfully (pending payment)",
        "order": order,
        "total_amount": total,
        "currency": "INR"
    }
