module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:eslint-comments/recommended',
        'plugin:promise/recommended',
        'plugin:unicorn/recommended',
        'plugin:prettier/recommended',
        'prettier/react',
        'prettier/@typescript-eslint',
    ],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
            node: {
                extensions: ['.js', '.jsx', 'ts', '.tsx', '.d.ts'],
            },
        },
    },
    env: {
        node: true,
        browser: true,
        jest: true,
    },
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: [
        'prettier',
        '@typescript-eslint',
        'promise',
        'unicorn',
        'eslint-comments',
        'prefer-arrow',
        'import',
    ],
    rules: {},
}