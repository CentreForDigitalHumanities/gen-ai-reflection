from django.urls import path

from . import views


urlpatterns = [
    path("generate-pdf/", views.generate_pdf),
    path("generate-html/", views.generate_html),
]
