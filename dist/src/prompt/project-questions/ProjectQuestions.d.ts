export declare const ARG_TEMPLATE = "template";
export declare const ARG_PROJECT_NAME = "name";
export declare const ARG_PROJECT_DESCRIPTION = "description";
export declare const PROJECT_TEMPLATE_QUESTION: {
    name: string;
    type: string;
    message: string;
    choices: string[];
};
export declare const PROJECT_NAME_QUESTION: {
    name: string;
    type: string;
    message: string;
    when: () => boolean;
    validate: (input: string) => string | true;
};
export declare const PROJECT_DESCRIPTION_QUESTION: {
    name: string;
    type: string;
    message: string;
    when: () => boolean;
    validate: (input: string) => true | "Project description may only include letters, numbers, underscores, hashes and spaces.";
};
export declare const PROJECT_QUESTIONS: ({
    name: string;
    type: string;
    message: string;
    choices: string[];
} | {
    name: string;
    type: string;
    message: string;
    when: () => boolean;
    validate: (input: string) => string | true;
})[];
