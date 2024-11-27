interface FilterFields {
    [key: string]: {
        placeholder: string;
        path?: string;
        options?: string[],
    }
}

export type {
    FilterFields
}