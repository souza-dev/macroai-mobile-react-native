export type MacroValues = {
    foodName: string;
    calories: string;
    carbohydrates: string;
    proteins: string;
    fats: string;
};

export default function extractMacroValues(text: string): MacroValues[] {
    const regexPatterns: { [key: string]: RegExp } = {
        foodName: /- (.*?)(?=\s*:)/g, // Captura o nome da comida entre "- " e ":"
        calories: /\b(\d+(?:[.,]\d+)?)\s*(?:calories|calorias|kcal|cal)\b/i,
        carbohydrates:
            /\b(\d+(?:[.,]\d+)?)\s*g?\s*(?:carbohydrates|carboidratos|carbs|hidratos|glucides|kohlenhydrate|carb)\b/i,
        proteins: /\b(\d+(?:[.,]\d+)?)\s*g?\s*(?:proteins|proteínas|protéines|eiweiß|prot|protein)\b/i,
        fats: /\b(\d+(?:[.,]\d+)?)\s*g?\s*(?:fats|gorduras|grasas|graisses|fett|fat)\b/i,
    };

    const foodMatches = text.match(regexPatterns.foodName) || [];
    const result: MacroValues[] = [];

    // Extrair valores para cada comida encontrada
    for (const food of foodMatches) {
        const foodName = food.replace(/- /, '').trim(); // Limpa o nome da comida
        const macros: MacroValues = {
            foodName: foodName,
            calories: '',
            carbohydrates: '',
            proteins: '',
            fats: '',
        };

        // Busca as informações nutricionais usando o texto original
        const macroText = text.substring(text.indexOf(food) + food.length);
        const calorieMatch = macroText.match(regexPatterns.calories);
        const carbMatch = macroText.match(regexPatterns.carbohydrates);
        const proteinMatch = macroText.match(regexPatterns.proteins);
        const fatMatch = macroText.match(regexPatterns.fats);

        if (calorieMatch) macros.calories = calorieMatch[1];
        if (carbMatch) macros.carbohydrates = carbMatch[1];
        if (proteinMatch) macros.proteins = proteinMatch[1];
        if (fatMatch) macros.fats = fatMatch[1];

        result.push(macros);
    }

    return result;
}
