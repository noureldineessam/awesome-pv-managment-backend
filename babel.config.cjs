module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-transform-modules-commonjs",
        "@babel/plugin-syntax-import-meta" // Handle import.meta
    ]
};
