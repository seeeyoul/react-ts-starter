// eslint-disable-next-line unicorn/import-style
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { PROJECT_PATH } = require('../constant');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'none',
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: { pure_funcs: ['console.log'] },
                },
            }),
        ].filter(Boolean),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
            ignoreOrder: false,
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(
                `${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,css}`,
                { nodir: true },
            ),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'server', // 开一个本地服务查看报告
            analyzerHost: '127.0.0.1', // host 设置
            analyzerPort: 8888, // 端口号设置
        }),
    ],
});
