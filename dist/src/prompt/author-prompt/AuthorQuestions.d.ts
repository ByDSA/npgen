export declare const ARG_AUTHOR_NAME = "authorName";
export declare const AUTHOR_NAME_QUESTION: {
    name: string;
    type: string;
    message: string;
    when: () => boolean;
    validate: (input: string) => true | "Author name may only include letters, numbers, underscores and hashes.";
};
export declare const ARG_AUTHOR_EMAIL = "authorEmail";
export declare const AUTHOR_EMAIL_QUESTION: {
    name: string;
    type: string;
    message: string;
    when: () => boolean;
    validate: (input: string) => true | "Author name may only include letters, numbers, underscores and hashes.";
};
export declare const ARG_AUTHOR_GITHUB = "authorGithub";
export declare const AUTHOR_GITHUB_QUESTION: {
    name: string;
    type: string;
    message: string;
    when: () => boolean;
    validate: (input: string) => true | "Author name may only include letters, numbers, underscores and hashes.";
};
export declare const ARG_AUTHOR_NPMJS = "authorNpmjs";
export declare const AUTHOR_NPMJS_QUESTION: {
    name: string;
    type: string;
    message: string;
    when: () => boolean;
    validate: (input: string) => true | "Author name may only include letters, numbers, underscores and hashes.";
};
export declare const ARG_AUTHOR_URL = "authorUrl";
export declare const AUTHOR_URL_QUESTION: {
    name: string;
    type: string;
    message: string;
    when: () => boolean;
    validate: (input: string) => true | "That's not a valid URL.";
};
