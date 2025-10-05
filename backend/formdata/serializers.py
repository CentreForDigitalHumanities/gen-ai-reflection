from rest_framework import serializers

from formdata.models import (
    Adjustment,
    AssessmentForm,
    UseExample,
    KnownAiUse,
    KnownAiUseExample,
)


class UseExampleSerializer(serializers.ModelSerializer):
    scaleLevel = serializers.ReadOnlyField(source="scale_level")

    class Meta:
        model = UseExample
        fields = ("id", "text", "scaleLevel")


class KnownAiUseExampleSerializer(serializers.ModelSerializer):

    class Meta:
        model = KnownAiUseExample
        fields = ("id", "text")


class KnownAiUseSerializer(serializers.ModelSerializer):
    examples = KnownAiUseExampleSerializer(many=True)

    class Meta:
        model = KnownAiUse
        fields = ("id", "text", "examples")


class AdjustmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Adjustment
        fields = ("id", "text", "order")


class AssessmentFormSerializer(serializers.ModelSerializer):
    adjustments = AdjustmentSerializer(many=True)
    knownAiUses = KnownAiUseSerializer(many=True, source="known_ai_uses")

    class Meta:
        model = AssessmentForm
        fields = ("id", "name", "adjustments", "knownAiUses")
        depth = 1
