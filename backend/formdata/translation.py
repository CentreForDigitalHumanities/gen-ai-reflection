from modeltranslation.decorators import register
from modeltranslation.translator import translator, TranslationOptions

from . import models


@register(models.AssessmentForm)
class AssessmentFormTranslationOptions(TranslationOptions):
    fields = ("name",)


@register(models.UseExample)
class UseExampleTranslationOptions(TranslationOptions):
    fields = ("text",)


@register(models.ChallengeOpportunity)
class ChallengeOpportunityTranslationOptions(TranslationOptions):
    fields = ("text",)


@register(models.Adjustment)
class AdjustmentTranslationOptions(TranslationOptions):
    fields = ("text",)
