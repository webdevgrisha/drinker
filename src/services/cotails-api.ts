async function getData(endPoint: string) {
    const response = await fetch(`https://cocktails.solvro.pl/api/v1${endPoint}`);

    if (response.ok) {
        const json = await response.json();

        return json;
    } else {
        console.log('error: ', response.status)
    }

}

export default getData;