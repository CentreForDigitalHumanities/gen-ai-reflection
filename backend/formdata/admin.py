from django.contrib import admin
from django.forms import Textarea
from django.db import models

from .models import (
    AssessmentForm,
    Adjustment,
    KnownAiUse,
    KnownAiUseExample,
    UseExample,
    ChallengeOpportunity,
)

admin.site.site_header = "GenAI Reflection Administration"
admin.site.site_title = "GenAI Reflection Admin"
admin.site.index_title = "GenAI Reflection Admin Dashboard"


class ListDescriptionMixin:
    """
    Adds a description text to the admin list view using the `list_description`
    attribute on a ModelAdmin class. The template in
    formdata/templates/admin/formdata/change_list.html is used for this.
    """

    list_description = None

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        if self.list_description:
            extra_context["description"] = self.list_description
        return super().changelist_view(request, extra_context)  # type: ignore


class SingleRowTextareaMixin:
    """
    Mixin to reduce the height of Textarea widgets to a single row in the admin.
    """

    formfield_overrides = {
        models.TextField: {"widget": Textarea(attrs={"rows": 1, "cols": 80})},
    }


@admin.register(Adjustment)
class AdjustmentAdmin(ListDescriptionMixin, SingleRowTextareaMixin, admin.ModelAdmin):
    list_display = ["text_en", "text_nl", "order"]
    list_description = "These adjustments are shown in Step 2 ('Assessment Forms') after a user answers 'Yes' to the question whether the use of GenAI affects the extent to which the associated learning outcome can be tested."


@admin.register(AssessmentForm)
class AssessmentFormAdmin(ListDescriptionMixin, admin.ModelAdmin):
    list_display = ["name_en", "name_nl"]
    list_description = (
        "These assessment forms are selectable in the dropdown menu on Step 2 ('Assessment Forms') of the application. "
        "When adding new ones, make sure to provide Known AI uses and Known AI use examples as well."
    )
    filter_horizontal = ["adjustments"]


@admin.register(UseExample)
class UseExampleAdmin(ListDescriptionMixin, SingleRowTextareaMixin, admin.ModelAdmin):
    list_display = ["text_en", "text_nl", "scale_level"]
    list_description = "These examples appear in Step 3 ('Course Integration'). They are shown if the associated AI Assessment scale level is selected."


@admin.register(KnownAiUse)
class KnownAiUseAdmin(ListDescriptionMixin, SingleRowTextareaMixin, admin.ModelAdmin):
    list_display = ["text_en", "text_nl"]
    list_description = "Known AI uses are selectable in Step 2 ('Assessment Forms') of the application. They are shown when the user selects the associated assessment form. A user can select a Known AI use to see related examples. Make sure to add these as well."
    fields = ["text", "text_en", "text_nl", "assessment_forms"]
    filter_horizontal = ["assessment_forms"]


@admin.register(KnownAiUseExample)
class KnownAiUseExampleAdmin(
    ListDescriptionMixin, SingleRowTextareaMixin, admin.ModelAdmin
):
    list_display = ["text_en", "text_nl", "ai_use"]
    list_description = "These examples appear in Step 2 ('Assessment Forms'). They are linked to Known AI uses and display in a list when a Known AI use is selected."


@admin.register(ChallengeOpportunity)
class ChallengeOpportunityAdmin(
    ListDescriptionMixin, SingleRowTextareaMixin, admin.ModelAdmin
):
    list_display = ("text", "dublin_indicator", "category")
    ordering = ("dublin_indicator", "text", "category")
    list_description = "Challenges and opportunities appear on Step 1 after selecting a Dublin indicator for an Intended Learning Objective (ILO)."
