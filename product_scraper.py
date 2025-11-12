from playwright.sync_api import sync_playwright
import json, os, time
from datetime import datetime

DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)
OUTPUT_FILE = os.path.join(DATA_DIR, "products.json")

def crawl_meesho(seed_urls, max_products=10):
    products = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
            viewport={"width":1280, "height":800},
            locale="en-US",
        )
        page = context.new_page()

        for url in seed_urls:
            print(f"🔍 Crawling: {url}")
            try:
                page.goto(url, timeout=90000, wait_until="domcontentloaded")
                time.sleep(8)

                # Scroll to load lazy content
                for _ in range(5):
                    page.mouse.wheel(0, 1000)
                    time.sleep(2)

                cards = page.query_selector_all('div[data-testid="ProductCard"]')

                print(f"🛍 Found {len(cards)} products on {url}")

                for card in cards[:max_products]:
                    try:
                        title_el = card.query_selector("p") or card.query_selector("h3")
                        title = title_el.inner_text().strip() if title_el else "No Title"
                        link_el = card.query_selector("a")
                        link = link_el.get_attribute("href") if link_el else ""
                        full_link = f"https://www.meesho.com{link}"

                        products.append({
                            "title": title,
                            "url": full_link,
                            "source": url,
                            "scraped_at": datetime.now().isoformat()
                        })
                    except Exception as e:
                        print("⚠️ Product skipped:", e)
            except Exception as e:
                print(f"🚫 Access error on {url}: {e}")

        browser.close()

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=4)

    print(f"✅ Saved {len(products)} products → {OUTPUT_FILE}")
    return {"saved_products": len(products), "file": OUTPUT_FILE}
