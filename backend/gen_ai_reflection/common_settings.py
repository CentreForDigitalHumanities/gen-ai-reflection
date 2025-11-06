INSTALLED_APPS = [
    "modeltranslation",  # Before admin as suggested in the docs
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "livereload",
    "django.contrib.staticfiles",
    "rest_framework",
    "revproxy",
    "formdata",
    "report",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/
LANGUAGES = [
    ("en", "English"),
    ("nl", "Nederlands"),
]
LANGUAGE_CODE = "en"

TIME_ZONE = "Europe/Amsterdam"

USE_I18N = True

USE_TZ = True
