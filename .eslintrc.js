module.exports = {
  extends: ['@uncovertruth/eslint-config'],
  parser: 'babel-eslint',
  env: {
    'node': true
  },
  globals: {
    'chrome': true
  },
  rules: {
    'semi': [2, 'always']
  }
}
