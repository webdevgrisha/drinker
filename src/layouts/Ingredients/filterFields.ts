import { FilterFields } from "@/components/interfaces";

const filterFields: FilterFields = {
    'type': {
        placeholder: "Select a ingredient types",
        path: "/ingredients/types",
    },
    'alcohol': {
        placeholder: "Is Alcohol",
        options: ["true", "false"],
    },
    'sort': {
        placeholder: "Sort by",
        options: [
            "+name",
            "-name",
            "+alcohol",
            "-alcohol",
            "+type",
            "-type",
            "+description",
            "-description",
            "+percentage",
            "-percentage"
        ],
    },
};


export default filterFields;