module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'], // já inclui tudo que o Expo Router precisa
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src'],
                    alias: {
                        '@assets': './src/assets',
                        '@components': './src/components',
                        '@hooks': './src/hooks',
                        '@locales': './src/locales',
                    },
                },
            ],
        ],
    };
};
