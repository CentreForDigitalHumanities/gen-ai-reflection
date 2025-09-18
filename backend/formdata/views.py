from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from formdata.models import AssessmentForm, UseExample, ChallengeOpportunity
from formdata.serializers import AssessmentFormSerializer, UseExampleSerializer


def get_challenges_opportunities_per_di(category: ChallengeOpportunity.Category) -> dict[str, list[str]]:
    """Return a dict of Dublin indicators and their corresponding challenges or opportunities."""
    entries = list(ChallengeOpportunity.objects.filter(category=category).values("dublin_indicator", "text"))
    return {
        indicator: [x["text"] for x in entries if x["dublin_indicator"] == indicator]
        for indicator in ChallengeOpportunity.DublinIndicator
    }


@api_view(["GET"])
def get_data(request: Request) -> Response:
    assessment_forms_s = AssessmentFormSerializer(AssessmentForm.objects.prefetch_related("adjustments"), many=True)
    use_examples_s = UseExampleSerializer(UseExample.objects.all(), many=True)

    return Response({
        "assessmentForms": assessment_forms_s.data,
        "aiUseExamples": use_examples_s.data,
        "challenges": get_challenges_opportunities_per_di(ChallengeOpportunity.Category.CHALLENGE),
        "opportunities": get_challenges_opportunities_per_di(ChallengeOpportunity.Category.OPPORTUNITY),
    })
