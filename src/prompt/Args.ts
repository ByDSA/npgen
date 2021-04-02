import { AuthorAnswers } from "./author-prompt/AuthorPrompt";
import { ProjectAnswers } from "./project-questions/ProjectQuestionsPrompt";
import { RepoAnswers } from "./repo-questions/RepoQuestionsPrompt";

type OtherArgs = {out?: string};
export type Args = AuthorAnswers & OtherArgs & ProjectAnswers & RepoAnswers;
