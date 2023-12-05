interface PagedResult<T> {
    total: number;
    items: T[];
}

interface StandardResult<T> {
    StatusCode: number;
    Result: T;
    ErrorMessage?: string;
}

export type {
    PagedResult,
    StandardResult
}