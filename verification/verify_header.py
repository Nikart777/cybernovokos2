from playwright.sync_api import sync_playwright

def verify_header_nav(page):
    page.goto('http://localhost:3000')

    # Check if ARENA link exists
    arena_btn = page.locator('button:has-text("ARENA")').first

    if arena_btn.is_visible():
        print("ARENA link found.")
        arena_btn.click()
        # Should navigate to /arena
        page.wait_for_url('**/arena')
        print("Navigated to /arena successfully.")

        # Take screenshot of landing with header to see the button style
        page.goto('http://localhost:3000')
        page.screenshot(path='verification/header_link.png')
        print("Header screenshot taken.")
    else:
        print("ARENA link NOT found!")
        raise Exception("Header update failed")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        try:
            verify_header_nav(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
