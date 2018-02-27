module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "amd":true,
        // "react-native/react-native": true
    },
    "extends": ["plugin:react/recommended"],
    "parserOptions": {
        "ecmaVersion":8,
        "ecmaFeatures": {
            "ecmaVersion":2017,
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        // "react-native"
    ],
    "rules": {
        "react/prop-types": 0,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
