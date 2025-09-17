from django.db import models


class ChallengeOpportunity(models.Model):
    class Meta:
        verbose_name_plural = "challenges and opportunities"
        verbose_name = "challenge or opportunity"

    class DublinIndicator(models.TextChoices):
        KNOWLEDGE_AND_UNDERSTANDING = "knowledge_and_understanding", "Knowledge and Understanding"
        APPLYING_KNOWLEDGE_AND_UNDERSTANDING = "applying_knowledge_and_understanding", "Applying Knowledge and Understanding"
        MAKING_JUDGEMENTS = "making_judgements", "Making Judgements"
        COMMUNICATION = "communication", "Communication"
        LIFELONG_LEARNING_SKILLS = "lifelong_learning_skills", "Lifelong Learning Skills"

    class Category(models.TextChoices):
        CHALLENGE = "challenge", "Challenge"
        OPPORTUNITY = "opportunity", "Opportunity"

    text = models.TextField()
    dublin_indicator = models.CharField(max_length=50, choices=DublinIndicator)
    category = models.CharField(max_length=50, choices=Category)

    def __str__(self):
        return f"{self.get_category_display()}: {self.text}"


class AssessmentForm(models.Model):
    name = models.CharField(max_length=100)
    adjustments = models.ManyToManyField("Adjustment")

    def __str__(self):
        return self.name


class Adjustment(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class UseExample(models.Model):
    class ScaleLevel(models.TextChoices):
        NO_AI = "no AI", "No AI"
        AI_PLANNING = "AI planning", "AI Planning"
        AI_COLLABORATION = "AI collaboration", "AI Collaboration"
        FULL_AL = "full AI", "Full AI"
        AI_EXPLORATION = "AI exploration", "AI Exploration"

    scale_level = models.CharField(max_length=50, choices=ScaleLevel)
    text = models.TextField()

    def __str__(self):
        return f"{self.text} ({self.get_scale_level_display()})"
