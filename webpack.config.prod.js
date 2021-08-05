const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const {
    getHTMLPlugins,
    getOutput,
    getCopyPlugins,
    getZipPlugin,
    getEntry,
    getResolves,
    getDefinePlugins,
    getCleanWebpackPlugin,
} = require('./webpack.utils');
const webpack = require('webpack');
const path = require('path');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const baseManifest = require('./src/baseManifest.json');

const dotenv = require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const config = dotenv.parsed;

const NODE_ENV = 'production';
const TARGET = process.env.TARGET;

const generalConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    resolve: getResolves(),
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
};

const eslintOptions = {
    fix: true,
};

module.exports = [
    {
        ...generalConfig,
        entry: getEntry(config.SRC_DIR),
        output: getOutput(TARGET, config.TEMP_DIR),
        plugins: [
            ...getCleanWebpackPlugin(TARGET, config.TEMP_DIR, config.DIST_DIR),
            new webpack.ProgressPlugin(),
            new ESLintPlugin(eslintOptions),
            new WebpackExtensionManifestPlugin({
                config: { base: baseManifest },
            }),
            ...getDefinePlugins({ NODE_ENV }),
            ...getHTMLPlugins(TARGET, config.TEMP_DIR, config.SRC_DIR),
            ...getCopyPlugins(TARGET, config.TEMP_DIR, config.SRC_DIR),
            ...getZipPlugin(TARGET, config.DIST_DIR),
        ],
    },
];
