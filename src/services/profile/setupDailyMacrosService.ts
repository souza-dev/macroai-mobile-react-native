import setupDailyMacros from 'api/profile/setupDailyMacros';

type MacroResult = {
    calories: number | null;
    protein: number | null;
    carbs: number | null;
    fats: number | null;
};

/**
 * Usa a api setupDailyMacros pra obter os valores sugeridos para preencher o perfil.
 * @param body - Objeto do tipo setupDailyMacrosProps .
 * @returns -  objeto do tipo MacroResult.
 */
export default async function setupDailyMacrosService(macros: User['setupMacrosProfile']) {
    const response = await setupDailyMacros(macros);
    const macrosParsed = parseMacros(response.content);
    return macrosParsed;
}

function parseMacros(input: string): MacroResult {
    const result: MacroResult = {
        calories: null,
        protein: null,
        carbs: null,
        fats: null,
    };

    // Regex para cada macro, de forma independente
    const caloriesRegex = /calories\s*[:\-\s]*([\d.,]+)\s*(?:cal|kcal)?/i;
    const proteinRegex = /protein\s*[:\-\s]*([\d.,]+)\s*g?/i;
    const carbsRegex = /(?:carbohydrates|carbs)\s*[:\-\s]*([\d.,]+)\s*g?/i;
    const fatsRegex = /fats\s*[:\-\s]*([\d.,]+)\s*g?/i;

    // Procurando por calorias
    const caloriesMatch = input.match(caloriesRegex);
    if (caloriesMatch) {
        result.calories = parseFloat(caloriesMatch[1].replace(',', '.'));
    }

    // Procurando por proteínas
    const proteinMatch = input.match(proteinRegex);
    if (proteinMatch) {
        result.protein = parseFloat(proteinMatch[1].replace(',', '.'));
    }

    // Procurando por carboidratos
    const carbsMatch = input.match(carbsRegex);
    if (carbsMatch) {
        result.carbs = parseFloat(carbsMatch[1].replace(',', '.'));
    }

    // Procurando por gorduras
    const fatsMatch = input.match(fatsRegex);
    if (fatsMatch) {
        result.fats = parseFloat(fatsMatch[1].replace(',', '.'));
    }

    return result;
}
