const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');
const { SERVER_HOST, SERVER_PORT } = require('../constant');
const proxySettings = require('../../src/proxy');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-sourse-map',
    devServer: {
        host: SERVER_HOST,
        port: SERVER_PORT,
        stats: 'errors-only',
        clientLogLevel: 'silent',
        compress: true,
        open: true,
        hot: true,
        proxy: {
            ...proxySettings,
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
