import {
    AIUse,
    AssessmentForm,
    Challenges,
    DublinIndicator,
    ILOWithAlternatives,
    Opportunities,
} from "./types";

export const mockChallenges: Challenges = {
    [DublinIndicator.KNOWLEDGE_AND_UNDERSTANDING]: [
        "Students may rely on AI-generated content without deep understanding.",
        "It can be difficult to distinguish between AI-generated knowledge and own critical thinking.",
    ],
    [DublinIndicator.APPLYING_KNOWLEDGE_AND_UNDERSTANDING]: [
        "GenAI can apply presented knowledge to problems which reduces students engagement in application.",
    ],
    [DublinIndicator.MAKING_JUDGEMENTS]: [
        "GenAI can make judgements for students.",
        "GenAI reproduces biases that can restrict students' ability to make judgements.",
    ],
    [DublinIndicator.COMMUNICATION]: [
        "GenAI can improve written communication, thus reduce students' need to develop their own writing skills.",
        "GenAI can homogenize communication styles, thus affecting originality.",
    ],
    [DublinIndicator.LIFELONG_LEARNING_SKILLS]: [
        "Students can become dependent on AI for learning",
        "Reliance on AI may affect students' independent study skills.",
    ],
};

export const mockOpportunities: Opportunities = {
    [DublinIndicator.KNOWLEDGE_AND_UNDERSTANDING]: [
        "GenAI can help students to explore complex topics faster and increase knowledge.",
    ],
    [DublinIndicator.APPLYING_KNOWLEDGE_AND_UNDERSTANDING]: [
        "AI can provide cases to which knowledge is applied.",
        "AI can be used to generate multiple solutions and students reflect on the suitability of these solutions.",
    ],
    [DublinIndicator.MAKING_JUDGEMENTS]: [
        "We can teach students to critically assess GenAI content and verify sources.",
    ],
    [DublinIndicator.COMMUNICATION]: [
        "Students can use GenAI for grammar and style suggestions.",
        "Students can be trained to analyze GenAI communication and reflect on homogeneity, as well as what they can take from it.",
    ],
    [DublinIndicator.LIFELONG_LEARNING_SKILLS]: [
        "Students need to learn how to use GenAI responsibly and effectively given the expectations on the labor market.",
    ],
};

const mockAIUses: AIUse[] = [
    {
        id: "1",
        name: "Brainstorming",
        examples: [
            "Student uses ChatGPT to generate possible research angles.",
        ],
    },
    {
        id: "2",
        name: "Formulating RQ",
        examples: [
            "GenAI suggests multiple research questions based on keywords.",
        ],
    },
    {
        id: "3",
        name: "Literature",
        examples: ["AI helps summarize relevant academic articles."],
    },
    {
        id: "4",
        name: "Writing",
        examples: ["Draft paragraphs are improved using AI grammar tools."],
    },
    {
        id: "5",
        name: "Editing",
        examples: ["GenAI highlights passive voice and suggests improvements."],
    },
    {
        id: "6",
        name: "Generating images",
        examples: ["Generated visual aid"],
    },
    {
        id: "7",
        name: "Making the presentation",
        examples: ["GenAI proposes a slide outline and sample phrasing."],
    },
    {
        id: "8",
        name: "Answering questions",
        examples: [
            "AI provides rapid background info to support classroom answers.",
        ],
    },
    {
        id: "9",
        name: "Researching",
        examples: [
            "GenAI helps gather structured data from open-access platforms.",
        ],
    },
    {
        id: "10",
        name: "Making the product",
        examples: ["Student uses AI to mock-up a prototype for feedback."],
    },
];

const mockIloWithAlternatives: ILOWithAlternatives[] = [
    {
        id: "1",
        intendedOutcome: "Having topical or methodological knowledge",
        alternatives: ["Add a generative AI statement", "Add Q&A of some sort"],
    },
    {
        id: "2",
        intendedOutcome:
            "Able to apply concrete research skills needed to conduct independent research",
        alternatives: [
            "Add a generative AI statement",
            "Add a portfolio or report of the workflow used to go from research question to answer",
            "Draw up an outline of the final paper with the main arguments in class, discuss with peers, and stick to it",
            "Make use of specific literature, source material, theories or concepts, as defined in class",
            "Visit the library to find relevant literature during seminars",
        ],
    },
    {
        id: "3",
        intendedOutcome:
            "Have the academic skills to develop relevant research questions",
        alternatives: [
            "Add a generative AI statement",
            "Brainstorm research questions in class, without any digital devices, discuss with peers",
            "Provide references to relevant literature to argue why a research question is relevant",
            "Use GenAI to generate multiple research questions and argue which one is the most relevant",
        ],
    },
    {
        id: "4",
        intendedOutcome: "Writing skills",
        alternatives: [
            "Add a generative AI statement",
            "Add personality to writing style",
            "Prepare writing work at home, but write in class (on paper)",
            "Rethink what ‘writing skills’ means to include, for instance, ‘use generative AI to critically evaluate and improve your writing skills (and your texts)’",
        ],
    },
    {
        id: "5",
        intendedOutcome: "Able to work independently",
        alternatives: [
            "Add a generative AI statement",
            "Reflect on process in a written report, justifying important choices",
            "Rethink what ‘work independently’ means to include, for instance, ‘knowing how to use generative AI critically and productively as a personal assistant for brainstorming and feedback’",
        ],
    },
    {
        id: "6",
        intendedOutcome: "Able to work together in a group",
        alternatives: ["Reflect on group dynamic in a written report"],
    },
    {
        id: "7",
        intendedOutcome:
            "Able to reflect critically on the individual contribution to the field",
        alternatives: [
            "Add a generative AI statement",
            "Reflect on individual contribution to the field in a written report, justifying important choices",
        ],
    },
    {
        id: "8",
        intendedOutcome: "Technical skills to present knowledge and insights",
        alternatives: [
            "Add a generative AI statement",
            "Question technical choices in Q&A",
        ],
    },
    {
        id: "9",
        intendedOutcome: "Able to actively engage in class",
        alternatives: [
            "Forbid any digital devices in class",
            "Have conversations about personal opinions/perspectives rather than facts",
        ],
    },
    {
        id: "10",
        intendedOutcome: "Discover one’s own perspectives/position",
        alternatives: [
            "Have conversations about personal opinions/perspectives rather than facts",
        ],
    },
    {
        id: "11",
        intendedOutcome:
            "Able to formulate professional and personal learning goals",
        alternatives: [
            "Reflect on the professional and personal learning goals in a written report",
        ],
    },
    {
        id: "12",
        intendedOutcome:
            "Communicative skills to present knowledge and insights",
        alternatives: [],
    },
];

function findMockAIUse(name: string): AIUse {
    const match = mockAIUses.find((use) => use.name === name);
    if (!match) {
        console.error(`AI Use with name "${name}" not found.`);
    }
    return match as AIUse;
}

function findMockILOByName(name: string): ILOWithAlternatives {
    const match = mockIloWithAlternatives.find(
        (ilo) => ilo.intendedOutcome === name,
    );
    if (!match) {
        console.error(`ILO with name "${name}" not found.`);
    }
    return match as ILOWithAlternatives;
}

export const mockAssessments: AssessmentForm[] = [
    {
        id: "1",
        name: "Individual Paper",
        aiUses: [
            findMockAIUse("Brainstorming"),
            findMockAIUse("Formulating RQ"),
            findMockAIUse("Literature"),
            findMockAIUse("Writing"),
            findMockAIUse("Editing"),
        ],
        iloWithAlternatives: [
            findMockILOByName("Having topical or methodological knowledge"),
            findMockILOByName(
                "Able to apply concrete research skills needed to conduct independent research",
            ),
            findMockILOByName(
                "Have the academic skills to develop relevant research questions",
            ),
            findMockILOByName("Writing skills"),
            findMockILOByName("Able to work independently"),
            findMockILOByName(
                "Able to reflect critically on the individual contribution to the field",
            ),
        ],
    },
    {
        id: "2",
        name: "Presentation",
        aiUses: [
            findMockAIUse("Brainstorming"),
            findMockAIUse("Literature"),
            findMockAIUse("Generating images"),
            findMockAIUse("Making the presentation"),
        ],
        iloWithAlternatives: [
            findMockILOByName("Having topical or methodological knowledge"),
            findMockILOByName(
                "Technical skills to present knowledge and insights",
            ),
            findMockILOByName(
                "Communicative skills to present knowledge and insights",
            ),
        ],
    },
    {
        id: "3",
        name: "Participation",
        aiUses: [
            findMockAIUse("Brainstorming"),
            findMockAIUse("Answering questions"),
        ],
        iloWithAlternatives: [
            findMockILOByName("Having topical or methodological knowledge"),
            findMockILOByName("Able to actively engage in class"),
            findMockILOByName("Discover one’s own perspectives/position"),
            findMockILOByName(
                "Technical skills to present knowledge and insights",
            ),
        ],
    },
    {
        id: "4",
        name: "Proposal",
        aiUses: [
            findMockAIUse("Brainstorming"),
            findMockAIUse("Formulating RQ"),
            findMockAIUse("Literature"),
            findMockAIUse("Writing"),
        ],
        iloWithAlternatives: [],
    },
    {
        id: "5",
        name: "Group Assignment",
        aiUses: [
            findMockAIUse("Brainstorming"),
            findMockAIUse("Writing"),
            findMockAIUse("Editing"),
        ],
        iloWithAlternatives: [
            findMockILOByName(
                "Able to apply concrete research skills needed to conduct independent research",
            ),
            findMockILOByName(
                "Have the academic skills to develop relevant research questions",
            ),
        ],
    },
    {
        id: "6",
        name: "Internship",
        aiUses: [
            findMockAIUse("Brainstorming"),
            findMockAIUse("Researching"),
            findMockAIUse("Making the product"),
        ],
        iloWithAlternatives: [
            findMockILOByName(
                "Able to apply concrete research skills needed to conduct independent research",
            ),
            findMockILOByName(
                "Able to formulate professional and personal learning goals",
            ),
        ],
    },
];
