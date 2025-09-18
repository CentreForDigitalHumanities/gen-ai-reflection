from rest_framework import serializers

from formdata.models import AssessmentForm, UseExample


class AssessmentFormSerializer(serializers.ModelSerializer):
    adjustments = serializers.StringRelatedField(many=True)

    class Meta:
        model = AssessmentForm
        fields = "__all__"
        depth = 1


class UseExampleSerializer(serializers.ModelSerializer):
    scaleLevel = serializers.ReadOnlyField(source="scale_level")

    class Meta:
        model = UseExample
        fields = ("text", "scaleLevel")
