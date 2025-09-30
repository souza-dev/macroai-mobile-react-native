module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-native/all',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react', 'react-native', '@typescript-eslint', 'import', 'jest'],
    env: {
        'jest/globals': true,
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
    rules: {
        // 🔴 Não apagar nem ordenar imports
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'sort-imports': 'off',
        'import/order': 'off',
        'unused-imports/no-unused-imports': 'off',

        // Prettier como erro
        'prettier/prettier': 'error',
    },
};
