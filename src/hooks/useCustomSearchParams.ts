import { useLocation, useSearchParams } from "react-router-dom";
import useFavoritesId from "./useFavoritesId";
import { useEffect, useRef, } from "react";

interface NewSearchParams {
    [key: string]: string;
}


function useCustomSearchParams(): [URLSearchParams, (newSearchParams: NewSearchParams) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    const { pathname, search } = useLocation();
    const previousPathPart = useRef<string | null>(null); 
    const favoritesId = useFavoritesId();

    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '15';
    const pathPart: string = pathname.split("/")[1];

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [pathPart, search])

    useEffect(() => {
        const saveParams = localStorage.getItem(pathPart);
        const parsedParams = saveParams ? JSON.parse(saveParams) : {};

        if (search && pathPart !== previousPathPart.current) {
            const searchParamsObject = Object.fromEntries(new URLSearchParams(search).entries());

            setCustomSearchParams(searchParamsObject);
        } else if (pathPart === 'favourites') {
            setCustomSearchParams(parsedParams);
        } else {
            setCustomSearchParams(parsedParams);
        }

        previousPathPart.current = pathPart;

    }, [favoritesId, pathPart]);

    const setCustomSearchParams = (newSearchParams: NewSearchParams | URLSearchParams) => {
        const newSearchParamsConfig = { page, perPage, ...newSearchParams }
        if (pathPart === 'favourites') {
            setSearchParams({...newSearchParamsConfig, id: favoritesId });
            localStorage.setItem(pathPart, JSON.stringify(newSearchParamsConfig));
        } else {
            setSearchParams(newSearchParamsConfig);
            localStorage.setItem(pathPart, JSON.stringify(newSearchParamsConfig));
        }
    }

    return [searchParams, setCustomSearchParams];
}

export default useCustomSearchParams;