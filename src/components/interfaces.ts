interface FilterFields {
    [key: string]: {
        placeholder: string;
        path?: string;
        options?: string[],
        parseKey?: string,
    }
}

export type {
    FilterFields
}