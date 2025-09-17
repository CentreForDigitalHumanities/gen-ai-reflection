from django.contrib import admin

from .models import AssessmentForm, Adjustment, UseExample, ChallengeOpportunity


@admin.register(Adjustment)
class AdjustmentAdmin(admin.ModelAdmin):
    pass


@admin.register(AssessmentForm)
class AssessmentFormAdmin(admin.ModelAdmin):
    pass


@admin.register(UseExample)
class UseExampleAdmin(admin.ModelAdmin):
    pass


@admin.register(ChallengeOpportunity)
class ChallengeOpportunityAdmin(admin.ModelAdmin):
    pass
