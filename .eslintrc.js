module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier', 'import'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'no-console': 'off',
    'object-curly-spacing': 'off',
    'array-bracket-spacing': 'off',
    'require-jsdoc': 'off',
    'max-len': [
      1,
      135,
      4,
      { ignoreComments: true, ignoreUrls: true, ignoreStrings: true },
    ],
    camelcase: 'off',
    'new-cap': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'guard-for-in': 'off',
    'react/display-name': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
