import { FilterFields } from "@/components/interfaces";

const filterFields: FilterFields = {
    'ingredientId': {
        placeholder: "Main ingredient",
        path: "/ingredients?perPage=1000",
        parseKey: 'name',
    },
    'glass': {
        placeholder: "Select a glass",
        path: "/cocktails/glasses",
    },
    'category': {
        placeholder: "Select a categorie",
        path: "/cocktails/categories",
    },
    'alcoholic': {
        placeholder: "Is Alcoholic",
        options: ["true", "false"],
    },
    'sort': {
        placeholder: "Sort by",
        options: [
            "+name",
            "-name",
            "+alcoholic",
            "-alcoholic",
            "+category",
            "-category",
            "+glass",
            "-glass",
        ],
    },
};

export default filterFields;