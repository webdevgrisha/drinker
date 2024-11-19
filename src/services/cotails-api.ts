import { error } from "firebase-functions/logger";
import { LoaderFunctionArgs } from "react-router-dom";

// interface SearchParams {
//     term: string;
//     page: string;
// }

async function getCotails(endPoint: string) {

    console.log('endPoint: ', endPoint);
    const response = await fetch(`https://cocktails.solvro.pl/api/v1${endPoint}`);

    if (response.ok) {
        const json = await response.json();


        console.log(`${endPoint}:`, json);

        return json;
    } else {
        console.log('error: ', response.status)
    }

}

async function getData(endPoint: string) {

    const response = await fetch(`https://cocktails.solvro.pl/api/v1${endPoint}`);

    if (response.ok) {
        const json = await response.json();


        console.log(`${endPoint}:`, json);

        return json;
    } else {
        console.log('error: ', response.status)
    }

}


getData('/ingredients');
getData('/ingredients/types');

export default getCotails;