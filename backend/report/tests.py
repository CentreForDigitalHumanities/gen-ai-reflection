from django.test import TestCase
from formdata.models import (
    AssessmentForm,
    Adjustment,
    ChallengeOpportunity,
    KnownAiUse,
    KnownAiUseExample,
    UseExample,
)
from report.report import create_report


class CreateReportTestCase(TestCase):
    def setUp(self):
        """Set up test data"""
        self.challenge_knowledge = ChallengeOpportunity.objects.create(
            text="Challenge 1",
            dublin_indicator=ChallengeOpportunity.DublinIndicator.KNOWLEDGE_AND_UNDERSTANDING,
            category=ChallengeOpportunity.Category.CHALLENGE,
        )
        self.opportunity_knowledge = ChallengeOpportunity.objects.create(
            text="Opportunity 1",
            dublin_indicator=ChallengeOpportunity.DublinIndicator.KNOWLEDGE_AND_UNDERSTANDING,
            category=ChallengeOpportunity.Category.OPPORTUNITY,
        )

        #
        # Adjustments
        #
        self.adjustment_1 = Adjustment.objects.create(text="Adjustment 1", order=1)
        self.adjustment_2 = Adjustment.objects.create(text="Adjustment 2", order=2)

        #
        # Assessment Forms
        #
        self.assessment_form_1 = AssessmentForm.objects.create(name="Assessment Form 1")
        self.assessment_form_1.adjustments.add(self.adjustment_1, self.adjustment_2)

        self.assessment_form_2 = AssessmentForm.objects.create(name="Assessment Form 2")

        #
        # Known AI Uses and Examples
        #
        self.known_ai_use_1 = KnownAiUse.objects.create(
            text="Known AI Use 1 (AssessmentForm 1)"
        )
        self.known_ai_use_1.assessment_forms.add(self.assessment_form_1)

        self.known_ai_use_2 = KnownAiUse.objects.create(
            text="Known AI Use 2 (AssessmentForm 2)"
        )
        self.known_ai_use_2.assessment_forms.add(self.assessment_form_2)

        self.known_ai_use_3 = KnownAiUse.objects.create(
            text="Known AI Use 3 (AssessmentForm 1 + 2)"
        )
        self.known_ai_use_3.assessment_forms.add(
            self.assessment_form_1, self.assessment_form_2
        )

        # Known AI Use Example 1: added to Known AI Use 1 and Assessment Form 1
        self.example_1 = KnownAiUseExample.objects.create(
            text="Known AI Use Example 1 (AssessmentForm 1, Known AI Use 1)",
            ai_use=self.known_ai_use_1,
        )
        self.example_1.assessment_forms.add(self.assessment_form_1)

        # Known AI Use Example 2: added to Known AI Use 3 and ONLY to Assessment Form 1
        self.example_2 = KnownAiUseExample.objects.create(
            text="Known AI Use Example 2 (AssessmentForm 1, Known AI Use 3)",
            ai_use=self.known_ai_use_3,
        )
        self.example_2.assessment_forms.add(self.assessment_form_1)

        # Known AI Use Example 3: added to Known AI Use 3 and ONLY to Assessment Form 2
        self.example_3 = KnownAiUseExample.objects.create(
            text="Known AI Use Example 3 (AssessmentForm 2, Known AI Use 3)",
            ai_use=self.known_ai_use_3,
        )
        self.example_3.assessment_forms.add(self.assessment_form_2)

        # Known AI Use Example 4: added to Known AI Use 3 and both Assessment Forms.
        self.example_4 = KnownAiUseExample.objects.create(
            text="Known AI Use Example 4 (AssessmentForm 1 + 2, Known AI Use 3)",
            ai_use=self.known_ai_use_3,
        )
        self.example_4.assessment_forms.add(
            self.assessment_form_1, self.assessment_form_2
        )

        #
        # Use Examples
        #
        self.use_example = UseExample.objects.create(
            text="Use Example 1",
            scale_level=UseExample.ScaleLevel.AI_PLANNING,
        )

    def test_create_report_basic_structure(self):
        """Test that create_report generates HTML with basic course info"""
        data = {
            "course": "Introduction to AI",
            "name": "John Doe",
            "learningOutcomes": [],
            "assessments": [],
            "chosenAiUses": [],
        }

        html = create_report(data)

        self.assertIn("Introduction to AI", html)
        self.assertIn("John Doe", html)
        self.assertIn("GenAI Reflection – Report", html)

    def test_create_report_with_learning_outcomes(self):
        """Test that learning outcomes are included in the report"""
        data = {
            "course": "Test Course",
            "name": "Test User",
            "learningOutcomes": [
                {
                    "id": 1,
                    "intendedOutcome": "Students can analyze AI systems",
                    "dublinIndicator": ChallengeOpportunity.DublinIndicator.KNOWLEDGE_AND_UNDERSTANDING,
                }
            ],
            "assessments": [],
            "chosenAiUses": [],
        }

        html = create_report(data)

        self.assertIn("Students can analyze AI systems", html)
        self.assertIn("Knowledge and Understanding", html)
        self.assertIn("Challenge 1", html)
        self.assertIn("Opportunity 1", html)

    def test_create_report_with_assessments(self):
        """Test that assessment forms are included with filtered examples"""
        intended_outcome_text = "Test outcome"
        data = {
            "course": "Test Course",
            "name": "Test User",
            "learningOutcomes": [
                {
                    "id": 1,
                    "intendedOutcome": intended_outcome_text,
                    "dublinIndicator": None,
                }
            ],
            "assessments": [
                {
                    "assessmentId": self.assessment_form_1.pk,
                    "iloIds": [1],
                    "affected": True,
                }
            ],
            "chosenAiUses": [],
        }

        html = create_report(data)

        self.assertIn(self.assessment_form_1.name, html)
        self.assertIn(intended_outcome_text, html)
        self.assertIn(self.adjustment_1.text, html)
        self.assertIn(self.adjustment_2.text, html)

        self.assertIn(self.known_ai_use_1.text, html)
        self.assertIn(self.known_ai_use_3.text, html)
        # Should NOT include Known AI Use 2 which is only for Assessment Form 2
        self.assertNotIn(self.known_ai_use_2.text, html)

        # Should include examples 1, 2, and 4 which are linked to Assessment Form 1
        self.assertIn(self.example_1.text, html)
        self.assertIn(self.example_2.text, html)
        self.assertIn(self.example_4.text, html)
        # Should NOT include example_3 which is only linked to Assessment Form 2
        self.assertNotIn(self.example_3.text, html)

    def test_create_report_with_course_integration(self):
        """Test that course integration examples are included"""
        data = {
            "course": "Test Course",
            "name": "Test User",
            "learningOutcomes": [],
            "assessments": [],
            "chosenAiUses": [self.use_example.pk],
        }

        html = create_report(data)

        self.assertIn("AI Planning", html)
        self.assertIn(self.use_example.text, html)

    def test_create_report_assessment_not_affected(self):
        """Test that unaffected assessments are displayed correctly"""
        data = {
            "course": "Test Course",
            "name": "Test User",
            "learningOutcomes": [],
            "assessments": [
                {
                    "assessmentId": self.assessment_form_1.pk,
                    "iloIds": [],
                    "affected": False,
                }
            ],
            "chosenAiUses": [],
        }

        html = create_report(data)

        self.assertIn("<strong>does not</strong> affect", html)
        self.assertNotIn(self.adjustment_1.text, html)

    def test_create_report_filters_examples_correctly(self):
        """Test that examples are filtered per assessment form"""

        # Create an example for both forms
        example_for_both = KnownAiUseExample.objects.create(
            text="Example for both forms", ai_use=self.known_ai_use_3
        )
        example_for_both.assessment_forms.add(
            self.assessment_form_1, self.assessment_form_2
        )

        data = {
            "course": "Test Course",
            "name": "Test User",
            "learningOutcomes": [],
            "assessments": [
                {
                    "assessmentId": self.assessment_form_1.pk,
                    "iloIds": [],
                    "affected": False,
                }
            ],
            "chosenAiUses": [],
        }

        html = create_report(data)

        # Should include examples for Assessment Form 1 + Known AI Use 3
        self.assertIn(self.example_2.text, html)
        self.assertIn(self.example_4.text, html)
        # Should NOT include examples only for Assessment Form 2 + Known AI Use 2
        self.assertNotIn(self.example_3.text, html)
