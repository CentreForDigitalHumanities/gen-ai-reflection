import {
    AiAssessmentScaleLevel,
    AIUseExample,
    AssessmentForm,
    Challenges,
    DublinIndicator,
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

export const mockAssessments: AssessmentForm[] = [
    {
        id: "1",
        name: "Individual Paper/thesis",
        adjustments: [
            "Add GenAI statement",
            "Add portfolio of workflow",
            "Brainstorming in class, together with peers (e.g., hand in design and stick to it)",
            "Oral mini-defense (Q&A about the paper)",
            "Require drafts with comments (throughout the course)",
            "Literature: library visit in class",
            "Writing: Prepare at home, write in class",
            "Rethink 'writing skills', 'working independently'",
            "Process documentation: reflect on professional and personal learning goals",
            "If none of these adjustments to the assignment are sufficient, you have to reconsider the type of assignments, and/or critically reflect on whether the ILO needs to be adjusted (for the latter, you can find more information in Step 3 of this tool)."
        ]
    },
    {
        id: "2",
        name: "Presentation",
        adjustments: [
            "Stronger focus on Q&A (to test knowledge)",
            "Improvisation element (e.g. analysis of a chart/quote/object that the teacher brings and the students need to relate to the presentation)",
            "Interactive presentations (students need to include audience interaction which requires deeper understanding)",
            "Brainstorming: in class, together with peers (hand in design and stick to it)",
            "Literature: library visit in class",
            "Making the presentation in class",
            "Rethink 'technical skills', 'working independently'",
            "If none of these adjustments to the assignments are sufficient, you have to reconsider the type of assignments, and/or critically reflect on whether the ILO needs to be adjusted (for the latter, you can find more information in Step 3 of this tool)."
        ]
    },
    {
        id: "3",
        name: "Participation",
        adjustments: [
            "Stronger focus on Q&A (to test knowledge)",
            "Brainstorming: in class, with peers",
            "(Random) picking of students to lead discussions",
            "If none of these adjustments to the assignments are sufficient, you have to reconsider the type of assignments, and/or critically reflect on whether the ILO needs to be adjusted (for the latter, you can find more information in Step 3 of this tool)."
        ]
    },
    {
        id: "4",
        name: "Proposal",
        adjustments: [
            "Add GenAI statement",
            "Add portfolio of workflow",
            "Rethink 'writing skills', 'working independently'",
            "Literature: library visit in class; add report of how literature was found/why literature was selected.",
            "Process documentation: reflect on professional and personal learning goals",
            "If none of these adjustments to the assignments are sufficient, you have to reconsider the type of assignments, and/or critically reflect on whether the ILO needs to be adjusted (for the latter, you can find more information in Step 3 of this tool)."
        ]
    },
    {
        id: "5",
        name: "Group Assignment",
        adjustments: [
            "Add GenAI statement",
            "Process documentation: include reflection of each group member",
            "Live explanation: groups explain their work live, or as a video.",
            "If none of these adjustments to the assignments are sufficient, you have to reconsider the type of assignments, and/or critically reflect on whether the ILO needs to be adjusted (for the latter, you can find more information in Step 3 of this tool)."
        ]
    },
    {
        id: "6",
        name: "Internship",
        adjustments: [
            "Process documentation: (weekly) logbooks",
            "Process documentation: reflection on feedback",
            "Process documentation: reflect on professional and personal learning goals",
            "If none of these adjustments to the assignments are sufficient, you have to reconsider the type of assignments, and/or critically reflect on whether the ILO needs to be adjusted (for the latter, you can find more information in Step 3 of this tool)."
        ]
    },
];

export const mockAiUseExamples: AIUseExample[] = [{
    id: "1",
    scaleLevel: AiAssessmentScaleLevel.NO_AI,
    text: "Oral report / exam"
},
{
    id: "2",
    scaleLevel: AiAssessmentScaleLevel.NO_AI,
    text: "In-class assignments"
},
{
    id: "3",
    scaleLevel: AiAssessmentScaleLevel.NO_AI,
    text: "Drawing / hand drawn schemes (in class)"
},
{
    id: "4",
    scaleLevel: AiAssessmentScaleLevel.AI_PLANNING,
    text: "Brainstorming exercises with AI: research questions, paper design, arguments pro and contra -> prompt GenAI to generate alternatives and reflect on best ones"
},
{
    id: "5",
    scaleLevel: AiAssessmentScaleLevel.AI_COLLABORATION,
    text: "Have GenAI create different versions of the student’s output, for example a public summary, an opinion piece, a script for a podcast, etc."
},
{
    id: "6",
    scaleLevel: AiAssessmentScaleLevel.FULL_AI,
    text: "Have GenAI build a program, a website, or have it design a poster or a presentation -> something that we cannot expect our students to do themselves but that creates a new kind of output."
},
{
    id: "7",
    scaleLevel: AiAssessmentScaleLevel.AI_EXPLORATION,
    text: "Have GenAI play out historical dialogues, or have it engage in a conversation with you from the perspective of a historical figure. The assignment is in the input (detailed contextual information) rather than on the output."
},
{
    id: "8",
    scaleLevel: AiAssessmentScaleLevel.AI_EXPLORATION,
    text: "Reflect on the quality of GenAI’s output by asking it for something that you already know, for example ‘who caused the French Revolution?’ or ‘who started the First World War?’ to query its perspective (bias)."
}];
