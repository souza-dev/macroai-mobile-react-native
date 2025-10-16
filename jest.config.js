module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    rootDir: '<rootDir>/src',
    // Mapear SVGs para o mock
    moduleNameMapper: {
        '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
    },

    // Ignorar arquivos do node_modules que quebram Jest
    transformIgnorePatterns: ['node_modules/(?!(react-native|@react-native|expo|@expo|expo-router)/)'],

    // Extensões de arquivo que Jest deve reconhecer
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
