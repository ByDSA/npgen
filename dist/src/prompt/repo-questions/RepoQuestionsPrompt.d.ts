export declare type RepoAnswers = {
    repoDo: boolean;
    repoPrivate?: boolean;
};
export declare function repoPrompt(): Promise<RepoAnswers>;
