export declare type AuthorAnswers = {
    authorName: string;
    authorEmail: string;
    authorURL: string;
    authorGithub: string;
    authorNPMjs: string;
};
export default function authorPrompt(): Promise<AuthorAnswers>;
