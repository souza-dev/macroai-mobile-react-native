export default async function getScore(body: object) {
    const URL = 'https://api.aidietpro.com/v2/getScore.php';

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const json = await response.json();
    return json;
}
