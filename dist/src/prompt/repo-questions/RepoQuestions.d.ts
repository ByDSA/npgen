export declare const ARG_REPO_DO = "repoDo";
export declare const ARG_REPO_PRIVATE = "repoPrivate";
export declare const Q_REPO_DO: {
    name: string;
    type: string;
    message: string;
    when: () => boolean;
};
export declare const Q_REPO_PRIVATE: {
    name: string;
    type: string;
    message: string;
    when: (answers: any) => any;
};
