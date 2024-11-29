import { useEffect, useState } from "react";

function getCocktailsId() {
    const cocktailsId: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key === null || isNaN(+(key))) continue;

        cocktailsId.push(key as string);
    }

    return cocktailsId;
}


function useFavoritesId() {
    const [cocktailsId, setCocktailsId] = useState<string[]>(() => getCocktailsId());

    useEffect(() => {
        const handleStorageChange = () => {
            const result = getCocktailsId();

            setCocktailsId(result);
        }

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    if (cocktailsId.length === 0) return 'None';

    return cocktailsId;
}

export default useFavoritesId;