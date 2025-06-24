export enum DublinIndicator {
    KNOWLEDGE_AND_UNDERSTANDING = "knowledge_and_understanding",
    APPLYING_KNOWLEDGE_AND_UNDERSTANDING = "applying_knowledge_and_understanding",
    MAKING_JUDGEMENTS = "making_judgements",
    COMMUNICATION = "communication",
    LIFELONG_LEARNING_SKILLS = "lifelong_learning_skills",
}

export type Challenges = Record<DublinIndicator, string[]>;

export type Opportunities = Record<DublinIndicator, string[]>;

export interface AIUse {
    id: string;
    name: string;
    examples: string[];
}

export type ILOWithAlternatives = {
    id: string;
    intendedOutcome: string;
    alternatives: string[];
};

export interface AssessmentForm {
    id: string;
    name: string;
    aiUses: AIUse[];
    iloWithAlternatives: ILOWithAlternatives[];
}

export type ApiResponse = {
    challenges: Challenges;
    opportunities: Opportunities;
    assessmentForms: AssessmentForm[];
};
