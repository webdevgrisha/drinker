import { error } from "firebase-functions/logger";

async function getCotails(backPoint: string) {
    const response = await fetch(`https://cocktails.solvro.pl/api/v1/${backPoint}`);

    if (response.ok) {
        const json = await response.json();


        console.log(`${backPoint}:`, json);
    } else {
        console.log('error: ', response.status)
    }

}



export default getCotails;