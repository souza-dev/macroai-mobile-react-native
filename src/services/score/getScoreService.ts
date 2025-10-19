import getScore from 'api/score/getScore';

export default async function getScoreService(diet: string, messages: Array<object>, language: string) {
    const content = messages
        .filter((item: any) => item.role === 'assistant')
        .map((item: any) => item.content)
        .join(', ');

    const data = await getScore({
        diet: diet,
        messages: [{ role: 'user', content }],
        language: language,
    });

    if (isNaN(data.score)) {
        console.log('Score is NaN:', data.score);
        data.score = 0;
    }
    return data;
}
