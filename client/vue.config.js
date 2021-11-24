
module.exports = {
    devServer: {
      proxy: {
        '^/api/': {
            target: 'http://localhost:9000',
            ws: true,
            changeOrigin: true
        },
        '^/quizapi/': {
            target: 'http://localhost:9000',
            ws: true,
            changeOrigin: true
        },
      }
    }
  }