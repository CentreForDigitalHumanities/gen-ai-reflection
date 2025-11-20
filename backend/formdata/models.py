from django.db import models


class ChallengeOpportunity(models.Model):
    class Meta:
        verbose_name_plural = "challenges and opportunities"
        verbose_name = "challenge or opportunity"
        ordering = ("text",)

    class DublinIndicator(models.TextChoices):
        KNOWLEDGE_AND_UNDERSTANDING = (
            "knowledge_and_understanding",
            "Knowledge and Understanding",
        )
        APPLYING_KNOWLEDGE_AND_UNDERSTANDING = (
            "applying_knowledge_and_understanding",
            "Applying Knowledge and Understanding",
        )
        MAKING_JUDGEMENTS = "making_judgements", "Making Judgements"
        COMMUNICATION = "communication", "Communication"
        LIFELONG_LEARNING_SKILLS = (
            "lifelong_learning_skills",
            "Lifelong Learning Skills",
        )

    class Category(models.TextChoices):
        CHALLENGE = "challenge", "Challenge"
        OPPORTUNITY = "opportunity", "Opportunity"

    text = models.TextField()
    dublin_indicator = models.CharField(max_length=50, choices=DublinIndicator)
    category = models.CharField(max_length=50, choices=Category)

    def __str__(self):
        return f"{self.get_category_display()}: {self.text}"  # type: ignore  # automatic method


class AssessmentForm(models.Model):
    class Meta:
        ordering = ("name",)

    name = models.CharField(max_length=100)
    adjustments = models.ManyToManyField("Adjustment")

    def __str__(self):
        return self.name


class Adjustment(models.Model):
    class Meta:
        ordering = ("order", "text")

    text = models.TextField()
    order = models.PositiveIntegerField(
        default=0,
        help_text="The order in which the adjustments are presented to the user. If multiple adjustments have the same order, they will be presented in alphabetical order.",
    )

    def __str__(self):
        return self.text


class UseExample(models.Model):
    class Meta:
        ordering = ("text",)

    class ScaleLevel(models.TextChoices):
        NO_AI = "no AI", "No AI"
        AI_PLANNING = "AI planning", "AI Planning"
        AI_EDIT = "AI edit", "AI Edit"
        AI_SPECIFIC = "AI specific", "AI Specific"
        FULL_AI = "full AI", "Full AI"

    scale_level = models.CharField(max_length=50, choices=ScaleLevel)
    text = models.TextField()

    def __str__(self):
        return f"{self.text} ({self.get_scale_level_display()})"


class KnownAiUse(models.Model):
    class Meta:
        ordering = ("text",)
        verbose_name = "Known AI use"

    assessment_forms = models.ManyToManyField(
        AssessmentForm,
        related_name="known_ai_uses",
        blank=True,
    )

    text = models.TextField()

    def __str__(self):
        return f"{self.text}"


class KnownAiUseExample(models.Model):
    class Meta:
        ordering = ("text",)
        verbose_name = "Known AI use example"

    text = models.TextField()

    ai_use = models.ForeignKey(
        KnownAiUse,
        on_delete=models.CASCADE,
        related_name="examples",
    )

    assessment_forms = models.ManyToManyField(
        AssessmentForm,
        related_name="known_ai_use_examples",
        blank=True,
    )

    def __str__(self):
        ass_form_names = self.assessment_forms.values_list('name', flat=True)
        ass_form_names_str = ", ".join(ass_form_names)

        return f"{self.text} ({self.ai_use} -- {ass_form_names_str})"