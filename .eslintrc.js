/* eslint-disable immutable/no-mutation */
/* eslint-disable no-undef */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "immutable"
    ],
    "rules": {
        "immutable/no-let": 2,
        "immutable/no-this": 2,
        "immutable/no-mutation": 2
    }
};