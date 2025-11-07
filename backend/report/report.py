import datetime

from django.template.loader import render_to_string
from django.utils.translation import gettext

from formdata.models import ChallengeOpportunity, AssessmentForm, UseExample


class LearningOutcome:
    def __init__(self, data: dict):
        self.id = data["id"]
        self.text = data["intendedOutcome"]
        if data["dublinIndicator"]:
            dublin_indicator = ChallengeOpportunity.DublinIndicator(data["dublinIndicator"])
            self.dublin_indicator = gettext(dublin_indicator.label)
            self.challenges = ChallengeOpportunity.objects.filter(
                category=ChallengeOpportunity.Category.CHALLENGE, dublin_indicator=dublin_indicator
            ).values_list("text", flat=True)
            self.opportunities = ChallengeOpportunity.objects.filter(
                category=ChallengeOpportunity.Category.OPPORTUNITY, dublin_indicator=dublin_indicator
            ).values_list("text", flat=True)


class AssessmentData:
    def __init__(self, data: dict, learning_outcomes: list[LearningOutcome]):
        try:
            assessment_form_obj = AssessmentForm.objects.get(id=data["assessmentId"])
        except AssessmentForm.DoesNotExist:
            pass  # This may happen if no assessment form has been chosen.
        else:
            self.assessment_form = assessment_form_obj.name
            self.known_ai_uses = assessment_form_obj.known_ai_uses.all()
            self.adjustments = assessment_form_obj.adjustments.order_by("order").values_list("text", flat=True)
        self.learning_outcomes = [x.text for x in filter(lambda lo: lo.id in data["iloIds"], learning_outcomes)]
        self.affected = data["affected"] == True



def get_integrations_by_scale(data: dict):
    result = []
    for scale in UseExample.ScaleLevel.choices:
        # ScaleLevel.choices returns tuples of values and verbose text
        scale_val = scale[0]
        scale_text = gettext(scale[1])
        result.append({
            'scale': scale_text,
            'examples': UseExample.objects.filter(scale_level=scale_val, id__in=data).values_list('text', flat=True)
        })
    return result


def create_report(data: dict) -> str:
    """Create the inner HTML of the report using the form data from the
    frontend."""
    learning_outcomes = [LearningOutcome(data) for data in data["learningOutcomes"]]
    assessments = [AssessmentData(data, learning_outcomes) for data in data["assessments"]]
    course_integration = get_integrations_by_scale(data["chosenAiUses"])
    return render_to_string("report/inner_html.html", {
        'raw_data': data,
        'learning_outcomes': learning_outcomes,
        'assessments': assessments,
        'course_integration': course_integration,
        'current_date': datetime.datetime.now(),
    })
