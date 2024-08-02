const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/search',
        createProxyMiddleware({
            target: 'https://nominatim.openstreetmap.org',
            changeOrigin: true,
            pathRewrite: {
                '^/search': '',
            },
        })
    );
};
