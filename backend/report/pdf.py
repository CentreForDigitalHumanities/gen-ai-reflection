from weasyprint import HTML


def report_to_pdf(html: str) -> bytes:
    """Use the inner HTML of the report to generate a PDF."""
    html = HTML(string=html)
    return html.write_pdf()
