# ✅ auto_scheduler.py
import schedule
import time
import requests
import json

API_URL = "http://127.0.0.1:8000/checkout"

def auto_order_task():
    """Auto task to place AI-driven orders."""
    print("🤖 Running auto order check...")

    try:
        with open("data/products.json", "r") as f:
            products = json.load(f)

        for p in products:
            payload = {
                "product_id": p.get("id", "auto"),
                "product_url": p["url"],
                "supplier_price": p.get("price", 250.0),
                "qty": 1
            }
            res = requests.post(API_URL, json=payload)
            print("➡️ Response:", res.status_code, res.text)

    except Exception as e:
        print("⚠️ Auto task failed:", e)

# Run every 2 hours automatically
schedule.every(1).minutes.do(auto_order_task)

if __name__ == "__main__":
    print("🕐 Auto Scheduler running...")
    while True:
        schedule.run_pending()
        time.sleep(30)
