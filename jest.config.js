"use strict";
exports.__esModule = true;
var ts_jest_1 = require("ts-jest");
var tsconfig_json_1 = require("./tsconfig.json");
exports["default"] = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    testEnvironment: 'node',
    testRegex: '.spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    moduleNameMapper: (0, ts_jest_1.pathsToModuleNameMapper)(tsconfig_json_1.compilerOptions.paths, {
        prefix: '<rootDir>/'
    }),
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: './coverage',
    modulePathIgnorePatterns: ['<rootDir>/backup/']
};
