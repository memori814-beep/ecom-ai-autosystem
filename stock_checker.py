# ✅ stock_checker.py
from playwright.sync_api import sync_playwright

def check_meesho_stock(product_url: str) -> bool:
    """Check if Meesho product is in stock (returns True if available)."""
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(product_url, timeout=60000)
            page.wait_for_timeout(4000)

            html = page.content().lower()
            browser.close()

            if "out of stock" in html or "unavailable" in html:
                print("❌ Product out of stock.")
                return False
            else:
                print("✅ Product available.")
                return True

    except Exception as e:
        print(f"⚠️ Error checking stock: {e}")
        return False
