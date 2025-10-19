export default async function getScore(body: object) {
    const URL = 'https://api.aidietpro.com/v2/getScore.php';
    console.log('item para calcular score:', body);

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        console.log('erro dentro do GetScore API');
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return data;
    } else {
        const text = await response.text();
        console.warn('Unexpected response format:', text);
        throw new Error('Invalid response format (expected JSON)');
    }
}
