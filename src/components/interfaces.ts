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

interface CocktailPrewData {
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

interface CocktailData {
    alcoholic: boolean;
    category: string;
    createdAt: string;
    glass: string;
    id: number;
    imageUrl: string;
    instructions: string;
    name: string;
    updatedAt: string;
    ingredients: IngredientData[];
}

interface IngredientData {
    alcohol: boolean;
    createdAt: string;
    description: string | null;
    id: number;
    imageUrl: string | null;
    measure: string;
    name: string;
    percentage: string;
    type: string;
    updatedAt: string
}

interface ResponseData {
    data: CocktailPrewData[];
    meta: PageData;
}

export type {
    PageData,
    CocktailPrewData,
    ResponseData,
    CocktailData,
    IngredientData
}