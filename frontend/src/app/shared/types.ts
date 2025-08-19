export enum DublinIndicator {
    KNOWLEDGE_AND_UNDERSTANDING = "knowledge_and_understanding",
    APPLYING_KNOWLEDGE_AND_UNDERSTANDING = "applying_knowledge_and_understanding",
    MAKING_JUDGEMENTS = "making_judgements",
    COMMUNICATION = "communication",
    LIFELONG_LEARNING_SKILLS = "lifelong_learning_skills",
}

export type Challenges = Record<DublinIndicator, string[]>;

export type Opportunities = Record<DublinIndicator, string[]>;

export interface AssessmentForm {
    id: string;
    name: string;
    adjustments: string[];
}

export enum AiAssessmentScaleLevel {
    NO_AI = "no AI",
    AI_PLANNING = "AI planning",
    AI_COLLABORATION = "AI collaboration",
    FULL_AI = "full AI",
    AI_EXPLORATION = "AI exploration"
}

export interface AIUseExample {
    id: string;
    text: string;
    scaleLevel: AiAssessmentScaleLevel;
}

export type ApiResponse = {
    challenges: Challenges;
    opportunities: Opportunities;
    assessmentForms: AssessmentForm[];
    aiUseExamples: AIUseExample[];
};
