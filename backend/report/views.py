import base64

from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from report.pdf import report_to_pdf
from report.report import create_report


@api_view(["POST"])
def generate(request: Request):
    formdata = request.data
    inner_html = create_report(formdata)
    pdf = report_to_pdf(inner_html)
    pdf_base64 = base64.b64encode(pdf).decode("utf-8")
    return Response({
        "pdf": pdf_base64,
        "html": inner_html,
    })
