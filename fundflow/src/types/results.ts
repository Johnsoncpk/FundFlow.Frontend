interface PagedResult<T> {
    total: number;
    items: T[];
}

interface StandardResult<T> {
    statusCode: number;
    result?: T;
    errorMessage?: string;
}

export type {
    PagedResult,
    StandardResult
}