const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080/api/',
            pathRewrite: { '^/api': '/' },
            changeOrigin: true,
        }),
    )
    app.use(
        '/images',
        createProxyMiddleware({
            target: 'http://localhost:8080/images/',
            pathRewrite: { '^/images': '/' },
            changeOrigin: true,
        }),
    )
}