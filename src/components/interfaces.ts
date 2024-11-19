interface PageData {
    currentPage: number;
    firstPage: number;
    firstPageUrl: string;
    lastPage: number;
    lastPageUrl: string;
    nextPageUrl: string;
    perPage: number;
    previousPageUrl: null | string;
    total: number;
}

interface CoctailData {
    alcoholic: boolean;
    category: string;
    createdAt: string;
    glass: string;
    id: number;
    imageUrl: string;
    instructions: string;
    name: string;
    updatedAt: string;
}

interface ResponseData {
    data: CoctailData[];
    meta: PageData;
}

export type {
    PageData
    CoctailData,
    ResponseData,
}