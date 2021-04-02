import { AuthorAnswers } from "./author-prompt/AuthorPrompt";
import { ProjectAnswers } from "./project-questions/ProjectQuestionsPrompt";
import { RepoAnswers } from "./repo-questions/RepoQuestionsPrompt";
declare type OtherArgs = {
    out?: string;
};
export declare type Args = AuthorAnswers & OtherArgs & ProjectAnswers & RepoAnswers;
export {};
