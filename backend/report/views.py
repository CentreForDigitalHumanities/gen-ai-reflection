from django.http import HttpRequest, HttpResponse, FileResponse
from rest_framework.decorators import api_view
from rest_framework.request import Request

from report.pdf import report_to_pdf
from report.report import create_report


@api_view(["POST"])
def generate_pdf(request: Request):
    formdata = request.data
    inner_html = create_report(formdata)
    pdf = report_to_pdf(inner_html)
    return HttpResponse(pdf, content_type="application/pdf")


@api_view(["POST"])
def generate_html(request: Request):
    formdata = request.data
    inner_html = create_report(formdata)
    return HttpResponse(inner_html, content_type="text/html")
