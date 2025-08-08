export enum DublinIndicator {
    KNOWLEDGE_AND_UNDERSTANDING = "knowledge_and_understanding",
    APPLYING_KNOWLEDGE_AND_UNDERSTANDING = "applying_knowledge_and_understanding",
    MAKING_JUDGEMENTS = "making_judgements",
    COMMUNICATION = "communication",
    LIFELONG_LEARNING_SKILLS = "lifelong_learning_skills",
}

export type Challenges = Record<DublinIndicator, string[]>;

export type Opportunities = Record<DublinIndicator, string[]>;

export interface Assessment {
    id: string;
    name: string;
    adjustments: string[];
}

export type ApiResponse = {
    challenges: Challenges;
    opportunities: Opportunities;
    assessments: Assessment[];
};
