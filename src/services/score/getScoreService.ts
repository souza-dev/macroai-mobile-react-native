import getScore from 'api/score/getScore';
import map from 'lodash/map';
import omit from 'lodash/omit';

export default async function getScoreService(diet: string, messages: Array<object>, language: string) {
    const corrected = map(messages, (obj) => omit(obj, ['id', 'createdAt', 'macros', 'timestamp', 'type']));

    // let msg: Array<object> = [];
    // if (corrected.length >= 2) {
    //     msg = [corrected[corrected.length - 2], corrected[corrected.length - 1]];
    // }
    const data = await getScore({
        diet: diet,
        messages: corrected,
        language: language,
    });
    return data;
}
