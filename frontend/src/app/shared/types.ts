export enum DublinIndicator {
    KNOWLEDGE_AND_UNDERSTANDING = "knowledge_and_understanding",
    APPLYING_KNOWLEDGE_AND_UNDERSTANDING = "applying_knowledge_and_understanding",
    MAKING_JUDGEMENTS = "making_judgements",
    COMMUNICATION = "communication",
    LIFELONG_LEARNING_SKILLS = "lifelong_learning_skills",
}

export type Challenges = Record<DublinIndicator, string[]>;

export type Opportunities = Record<DublinIndicator, string[]>;

interface Adjustment {
    id: number;
    text: string;
    order: number;
}

interface KnownAiUseExample {
    id: number;
    text: string;
    assessmentForm: number;
}

export interface KnownAiUse {
    id: number;
    text: string;
    examples: KnownAiUseExample[];
}

export interface AssessmentForm {
    id: number;
    name: string;
    adjustments: Adjustment[];
    knownAiUses: KnownAiUse[];
}

export enum AiAssessmentScaleLevel {
    NO_AI = "no AI",
    AI_PLANNING = "AI planning",
    AI_COLLABORATION = "AI collaboration",
    FULL_AI = "full AI",
    AI_EXPLORATION = "AI exploration"
}

export interface AIUseExample {
    id: number;
    text: string;
    scaleLevel: AiAssessmentScaleLevel;
}

export type ApiResponse = {
    challenges: Challenges;
    opportunities: Opportunities;
    assessmentForms: AssessmentForm[];
    aiUseExamples: AIUseExample[];
};
