/** @type {import('stylelint').Config} */
export default {
  extends: [
    '@stylistic/stylelint-config',
    'stylelint-config-standard',
  ],
  rules: {
    '@stylistic/max-line-length': [240, { ignorePattern: '/^\\s*--/' }],
    'at-rule-no-unknown': [true, { ignoreAtRules: ['layer', 'tailwind', 'theme', 'utility', 'variant', 'custom-variant', 'source'] }],
    'alpha-value-notation': ['percentage'],
    'declaration-property-value-no-unknown': [true, { ignoreProperties: { 'appearance': ['base-select'], '-webkit-line-break': ['after-white-space'] } }],
    'import-notation': 'string',
    'nesting-selector-no-missing-scoping-root': null,
  },
  ignoreFiles: ['dist/**', 'src/theme/config/font.css', 'src/theme/config/spacing.css'],
}
