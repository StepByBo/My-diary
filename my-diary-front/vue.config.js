const { resolve } = require('path')
module.exports = {
    configureWebpack: {
        resolve: {
            alias: { // 别名配置
                '@': resolve('src'),
                'assets': '@/assets',
                'components': '@/components',
            }
        }
    },
    devServer:{
        port:8080,
        host:'127.0.0.1',
        open:true,
        https:false,
        proxy:{
            '/api':{
                target:'http://127.0.0.1.3000',
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}

