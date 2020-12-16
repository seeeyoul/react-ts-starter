module.exports = {
    '/api': {
        target: 'http://172.0.0.1',
        changeOrigin: true,
    },
    '/api-2': {
        target: 'http://172.0.0.1',
        changeOrigin: true,
        pathRewrite: {
            '^/api-2': '',
        },
    },
};
