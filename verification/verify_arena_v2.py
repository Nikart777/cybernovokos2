from playwright.sync_api import sync_playwright

def verify_arena(page):
    # page.goto('http://localhost:3000/arena')
    # Since we are restarting, let's clear local storage via script or just incognito

    context = page.context
    context.clear_cookies()

    page.goto('http://localhost:3000/arena')

    # 1. Login
    # Wait for login form
    page.wait_for_selector('h1:has-text("Club Arena")')

    page.fill('input[placeholder="Nagibator2000"]', 'TestPlayer')
    page.fill('input[placeholder="15 или VIP 2"]', '10')
    page.click('button:has-text("ВОЙТИ")')

    # Wait for arena page to load (header)
    page.wait_for_selector('header >> text=Club Arena')

    # 2. Create Lobby
    # Fill form
    page.select_option('select', 'CS2')
    page.fill('input[placeholder="Сумма (например, 200 руб)"]', '500')
    page.click('button:has-text("СОЗДАТЬ ЛОББИ")')

    # Wait for lobby to appear in the list.
    # The list is in the second section. We look for a h3 with text CS2.
    # We can also look for the bet amount in the list.
    page.wait_for_selector('div.bg-gray-800 >> h3:has-text("CS2")')
    page.wait_for_selector('div.bg-gray-800 >> text=500')

    # Take screenshot of Player Page
    page.screenshot(path='verification/arena_player.png')
    print("Player verification screenshot taken")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_arena(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path='verification/error.png')
        finally:
            browser.close()
