from django.db import models


class ChallengeOpportunity(models.Model):
    class DublinIndicator(models.TextChoices):
        KNOWLEDGE_AND_UNDERSTANDING = "KNOWLEDGE_AND_UNDERSTANDING", "Knowledge and Understanding"
        APPLYING_KNOWLEDGE_AND_UNDERSTANDING = "APPLYING_KNOWLEDGE_AND_UNDERSTANDING", "Applying Knowledge and Understanding"
        MAKING_JUDGEMENTS = "MAKING_JUDGEMENTS", "Making Judgements"
        COMMUNICATION = "COMMUNICATION", "Communication"
        LIFELONG_LEARNING_SKILLS = "LIFELONG_LEARNING_SKILLS", "Lifelong Learning Skills"

    class Category(models.TextChoices):
        CHALLENGE = "CHALLENGE", "Challenge"
        OPPORTUNITY = "OPPORTUNITY", "Opportunity"

    text = models.TextField()
    dublin_indicator = models.CharField(max_length=50, choices=DublinIndicator)
    category = models.CharField(max_length=50, choices=Category)


class AssessmentForm(models.Model):
    name = models.CharField(max_length=100)
    adjustments = models.ManyToManyField("Adjustment")


class Adjustment(models.Model):
    name = models.CharField(max_length=100)


class UseExample(models.Model):
    class ScaleLevel(models.TextChoices):
        NO_AI = "NO_AI", "No AI"
        AI_PLANNING = "AI_PLANNING", "AI Planning"
        AI_COLLABORATION = "AI_COLLABORATION", "AI Collaboration"
        FULL_AL = "FULL_AI", "Full AI"
        AI_EXPLORATION = "AI_EXPLORATION", "AI Exploration"

    scale_level = models.CharField(max_length=10, choices=ScaleLevel)
    text = models.TextField()
