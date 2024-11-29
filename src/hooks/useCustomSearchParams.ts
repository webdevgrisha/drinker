import { useLocation, useSearchParams } from "react-router-dom";
import useFavoritesId from "./useFavoritesId";
import { useEffect, } from "react";

interface NewSearchParams {
    [key: string]: string;
}


function useCustomSearchParams(): [URLSearchParams, (newSearchParams: NewSearchParams) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    const { pathname, search } = useLocation();
    const favoritesId = useFavoritesId();

    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '15';
    const pathPart: string = pathname.split("/")[1];

    console.log('useCustomSearchParams: ', location);

    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth",
    //       });
    // }, [pathname])

    useEffect(() => {
        const saveParams = localStorage.getItem(pathPart);
        const parsedParams = saveParams ? JSON.parse(saveParams) : {};
        if (pathPart === 'favourites') {
            setCustomSearchParams(parsedParams);
        } else {
            setCustomSearchParams(parsedParams);
        }

    }, [favoritesId, pathPart]);

    const setCustomSearchParams = (newSearchParams: NewSearchParams) => {
        const newSearchParamsConfig = { page, perPage, ...newSearchParams }
        if (pathPart === 'favourites') {
            setSearchParams({ id: favoritesId, ...newSearchParamsConfig });
            localStorage.setItem(pathPart, JSON.stringify(newSearchParamsConfig));
        } else {
            setSearchParams(newSearchParamsConfig);
            localStorage.setItem(pathPart, JSON.stringify(newSearchParamsConfig));
        }
    }

    return [searchParams, setCustomSearchParams];
}

export default useCustomSearchParams;