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

interface IngredientPrewData {
    id: number;
    name: string;
    description: string;
    alcohol: boolean;
    type: string;
    percentage: null;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

interface IngredientData {
    alcohol: boolean;
    createdAt: string;
    description: string | null;
    id: number;
    imageUrl: string | null;
    name: string;
    percentage: string;
    type: string;
    updatedAt: string
}

interface ResponseData {
    data: IngredientPrewData[];
    meta: PageData;
}

export type {
    PageData,
    IngredientPrewData,
    ResponseData,
    IngredientData
}