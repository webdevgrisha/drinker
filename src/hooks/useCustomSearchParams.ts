import { useLocation, useSearchParams } from "react-router-dom";
import useFavoritesId from "./useFavoritesId";
import { useEffect, useRef } from "react";

interface NewSearchParams {
    [key: string]: string;
}


function useCustomSearchParams(): [URLSearchParams, (newSearchParams: NewSearchParams) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    const prevPathPart = useRef<string | null>(null);
    const location = useLocation();
    const favoritesId = useFavoritesId();

    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '15';
    const pathPart: string = location.pathname.split("/")[1];

    console.log('location useCustomSearchParams: ', location);

    useEffect(() => {
        // console.log('call use effect');
        if (pathPart === 'favourites' && prevPathPart.current !== 'favourites') {
            console.log('1')
            setSearchParams({ perPage, id: favoritesId });
        } else if (pathPart === 'favourites' && prevPathPart.current === 'favourites') {
            console.log('2')
            const prevParams = Object.fromEntries(searchParams.entries())
            setSearchParams({ ...prevParams, id: favoritesId });
        } else {
            console.log('3')
            setSearchParams({ perPage });
        }

        prevPathPart.current = pathPart;
    }, [favoritesId, pathPart]);

    const setCustomSearchParams = (newSearchParams: NewSearchParams) => {
        if (pathPart === 'favourites') {
            setSearchParams({ id: favoritesId, page, perPage, ...newSearchParams });
        } else {
            setSearchParams({ page, perPage, ...newSearchParams, });
        }
    }

    return [searchParams, setCustomSearchParams];
}

export default useCustomSearchParams;