def test_gen_ai_reflection_frontend(browser, base_address):
    browser.get(base_address)
    try:
        assert "GenAI Reflection" in browser.title
    except:
        print(browser.title)
        raise


def test_gen_ai_reflection_admin(browser, admin_address):
    browser.get(admin_address)
    try:
        assert "Django" in browser.title
    except:
        print(browser.title)
        raise


def test_gen_ai_reflection_api(browser, api_address):
    browser.get(api_address)
    try:
        assert "Api Root" in browser.title
    except:
        print(browser.title)
        raise


def test_gen_ai_reflection_api_auth(browser, api_auth_address):
    browser.get(api_auth_address + "login/")
    try:
        assert "Django REST framework" in browser.title
    except:
        print(browser.title)
        raise
