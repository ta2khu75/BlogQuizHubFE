
export class BasePath {
    static readonly BASE_URL = "http://localhost:8080/api/v1/"
    static readonly quizzes = (() => {
        const root = "quizzes";
        return {
            root: () => root,
            byId: (id: number | string) => `${root}/${id}`,
            detail: (id: number | string) => `${root}/${id}/detail`,
            mineByKeyword: (keyword: string) => `${root}/mine/${keyword}`,
        };
    })();
    static readonly comments = (() => {
        const root = "comments"
        return {
            root: () => root,
            byId: (id: number | string) => `${root}/${id}`,
        }
    })();
    static readonly auth = (() => {
        const root = "auth";
        return {
            root: () => root,
            login: () => `${root}/login`,
            register: () => `${root}/register`,
            logout: () => `${root}/logout`,
            changePassword: () => `${root}/change-password`,
            changeProfile: () => `${root}/change-profile`,
        }
    })();
    static readonly accounts = (() => {
        const root = "accounts";
        return {
            root: () => root,
            byId: (id: number | string) => `${root}/${id}`,
            status: (id: number | string) => `${root}/status/${id}`,
            password: (id: number | string) => `${root}/password/${id}`,
            profile: (id: number | string) => `${root}/profile/${id}`,
        }
    })();
    static readonly roles = (() => {
        const root = "roles";
        return {
            root: () => root,
            byId: (id: number | string) => `${root}/${id}`,
        }
    })();
    static readonly permissionsGroups = (() => {
        const root = "permission-groups";
        return {
            root: () => root,
        }
    })();
    static readonly blogs = (() => {
        const root = "blogs";
        return {
            root: () => root,
            byId: (id: number | string) => `${root}/${id}`,
            comments: (id: number | string) => `${root}/${id}/comments`,
            tags: () => `${root}/tags`,

        };
    })();
    static readonly quizCategories = (() => {
        const root = "quiz-categories";
        return {
            root: () => root,
            byId: (id: number | string) => `${root}/${id}`,
        };
    })();
    static readonly blogTags = (() => {
        const root = "blog-tags";
        return {
            root: () => root,
            byId: (id: number | string) => `${root}/${id}`,
        }
    })();
    static readonly follows = (() => {
        const root = "follows";
        return {
            root: () => root,
            byId: (id: number | string) => `${root}/${id}`,
        }
    })()
    // static readonly AUTH = "auth"
    // static readonly ACCOUNT = "accounts"
    // static readonly FOLLOW = "follows"
    // static readonly BLOG = "blogs"
    // static readonly BLOG_TAG = "blog-tags"
    // static readonly QUIZ = "quizzes"
    // static readonly QUIZ_RESULT = "quiz-results"
    // static readonly QUIZ_CATEGORY = "quiz-categories"
    // static readonly COMMENT = "comments"
    // static readonly NOTIFICATION = "notifications"
    // static readonly ROLE = "roles"
    // static readonly PERMISSION = "permissions"
    // static readonly PERMISSION_GROUP = "permission-groups"
    // static readonly REPORT = "reports"
}