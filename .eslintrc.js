module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "@vue/standard"],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'space-comment': 0,
        'eol-last': 0,
        'semi': 0,
        'no-extra-semi': 0,
        'camelcase': 0,
        'indent': 0,
        'no-trailing-spaces': 0,
        'no-multiple-empty-lines': 0,
        'no-undef-init': 0,
        'quotes': 0,
        'padded-blocks': 0,
        'block-spacing': 0,
        'comma-spacing': 0,
        'object-curly-spacing': 0,
        'key-spacing': 0,
        'semi-spacing': 0,
        'space-infix-ops': 0,
        'brace-style': 0,
        'space-before-function-paren': 0,
        'no-undef': 0,
        'comma-dangle': 0,
        'vue/no-unused-components': 0,
        'keyword-spacing': 0,
        'arrow-spacing': 0,
        'space-before-blocks': 0,
        'no-unused-vars': 0,
        'no-tabs': 0,
        'no-mixed-operators': 0,
        'no-extra-parens': 0,
        'no-mixed-spaces-and-tabs': 0,
        'spaced-comment': 0,
        'no-redeclare': 0,
        'standard/computed-property-even-spacing': 0,
        'no-multi-spaces': 0,
        'one-var': 0,
        'space-in-parens': 0,
        'vue/no-side-effects-in-computed-properties': 0,
        'standard/array-bracket-even-spacing': 0,
        'no-unreachable':0
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};