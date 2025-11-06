from django.template.loader import render_to_string
from weasyprint import HTML


def report_to_pdf(html: str) -> bytes:
    """Use the inner HTML of the report to generate a PDF."""
    total_html = render_to_string("report/outer_html.html", {
        "inner_html": html,
    })
    html = HTML(string=total_html)
    return html.write_pdf()
