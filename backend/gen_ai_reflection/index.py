from os import getcwd, path
from django.http import HttpRequest, HttpResponse
from django.contrib.staticfiles import finders
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def index(request: HttpRequest):
    """Thin wrapper for the static index.html that adds the CSRF cookie."""
    language = request.LANGUAGE_CODE
    page = request.path[1:].split("/", 1)[0]
    # pre-rendered version available?
    location = finders.find(
        path.join("source", "frontend", "dist", "browser", language, page, "index.html")
    )

    if not location:
        location = finders.find(
            path.join("source", "frontend", "dist", "browser", language, "index.html")
        )

    prerendered_location = path.join(
        "source", "frontend", "dist", "browser", language, page, "index.html"
    )
    general_location = path.join(
        "source", "frontend", "dist", "browser", language, "index.html"
    )

    print("Current working directory:", getcwd())
    print(
        f"Looking for prerendered location: {prerendered_location} -> Found: {bool(location)}"
    )
    print(
        f"Looking for other location: {general_location} -> Found: {bool(finders.find(general_location))}"
    )

    return HttpResponse(content=open(location))
