module.exports = {
  root: true,
  extends: '@react-native-community',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    'prettier/prettier': 0,
  },
  parser: '@babel/eslint-parser',
};
