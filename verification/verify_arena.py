from playwright.sync_api import sync_playwright

def verify_arena(page):
    page.goto('http://localhost:3000/arena')

    # 1. Login
    page.fill('input[placeholder="Nagibator2000"]', 'TestPlayer')
    page.fill('input[placeholder="15 или VIP 2"]', '10')
    page.click('button:has-text("ВОЙТИ")')

    # Wait for arena page to load
    page.wait_for_selector('text=Club Arena')
    page.wait_for_selector('text=Игрок: TestPlayer')

    # 2. Create Lobby
    page.select_option('select', 'CS2')
    page.fill('input[placeholder="Сумма (например, 200 руб)"]', '500')
    page.click('button:has-text("СОЗДАТЬ ЛОББИ")')

    # Wait for lobby to appear
    page.wait_for_selector('text=CS2')
    page.wait_for_selector('text=500')

    # Take screenshot of Player Page
    page.screenshot(path='verification/arena_player.png')
    print("Player verification screenshot taken")

    # 3. Admin Page
    page.goto('http://localhost:3000/arena/admin')
    # Since we created a lobby, it should be visible here ONLY if it's waiting/active/payment_check.
    # But wait, the admin page filters for 'payment_check' or 'active'.
    # A newly created lobby is 'waiting', so it won't show up in Admin dashboard yet.
    # We need a second player to join to trigger 'payment_check'.

    page.screenshot(path='verification/arena_admin_empty.png')
    print("Admin verification screenshot taken (should be empty)")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_arena(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
