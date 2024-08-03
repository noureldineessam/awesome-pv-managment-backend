module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.mjs$': 'babel-jest',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(graphql)/)', // Adjust based on your needs
    ],
    moduleFileExtensions: ['js', 'mjs'], // Add mjs to handle ES modules
    testMatch: [
        "**/__tests__/**/*.(test|spec).js", // Match all test files
        "**/?(*.)+(test|spec).js"          // Match files with .test.js or .spec.js suffix
    ],
};
