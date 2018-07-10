module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        "ecmaVersion": 6,
        sourceType: 'module'
    },
    // https://github.com/airbnb/javascript
    extends: 'airbnb',
    // required to lint *.vue files
    plugins: [
        'vuefix',
        'jsfix'
    ],
    env:{
        "browser": true,
        "es6": true
    },
    // add your custom rules here
    'rules': {
        "indent": ["error", 4, {"SwitchCase": 1}],
        "no-extend-native": ["error", {"exceptions": ["Date", "String", "Array"]}],
        "func-names": ["error", "never"],
        "radix": ["error", "as-needed"],
        "no-console": "off",
        "global-require": "off",
        "arrow-parens": ["error", "as-needed"],
        "quote-props": ["error", "as-needed", {"unnecessary": false}],
        "no-empty": ["error", { "allowEmptyCatch": true }],
        "linebreak-style": "off",
        "no-param-reassign": "off",
        "import/no-dynamic-require": "off",
        "import/no-unresolved": "off",
        "import/first": "off",
        "import/extensions": "off",
        "no-undef": "off",
        "eqeqeq":"off",
        "import/no-extraneous-dependencies": "off"
    }
}
