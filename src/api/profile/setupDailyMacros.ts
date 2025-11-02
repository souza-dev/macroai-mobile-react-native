export default async function setupDailyMacros(macros: User['setupMacrosProfile']) {
    const apiUrl = process.env.EXPO_PUBLIC_API_SETUP_DAILY_MACROS as string;
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(macros),
    });

    if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    console.log(json);
    return json;
}
