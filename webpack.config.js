var webpack = require('webpack')
var path = require('path');

var autoprefixer = require('autoprefixer');

module.exports = {
    //插件项
    plugins: [
//上线前请进行压缩，开发环境可关闭
//    new webpack.optimize.UglifyJsPlugin({
//	        compress: {
//	            warnings: false,
//	        },
//	        comments:false,
//	        sourceMap: true,
//	        mangle: true
//	    })       
    ],
    //页面入口文件配置
    entry: {
    	'Index/js/index':'./build/index/js/index.jsx',
        //后台end
        
	},
    output: { //path.join(__dirname, 'app/public/js/dest')
        //path:'E:\\DODO\\MobilHN\\static\\src',
        path: path.join(__dirname, './src/'),
        filename: '[name].min.js',
        publicPath:'../../../src'
    },
    module: {
        //加载器配置
        loaders: [
        	{test:/\.vue$/,loader:'vue-loader'},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(js|jsx)$/, loader: 'babel-loader' },
            { 
                test: /\.less$/, 
                loader: ['style-loader','css-loader','postcss-loader','less-loader']
                
            },
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=/public/images/[name].[ext]'},
            { test: /\.(ttf|eot|woff|svg)$/, loader: "url-loader?name=/public/css/font/[name].[ext]" },
        ]
    },
    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json','.vue'],
        alias: {
            PublicJS : path.join(__dirname, "./build/Public/js/"),
            PublicCSS : path.join(__dirname, "./build/Public/css/"),
            PublicLESS : path.join(__dirname, "./build/Public/css/less/"),
            PUMP : path.join(__dirname, "./build/Public/js/ump.js"),
            PHN : path.join(__dirname, "./build/Public/js/HN.js")
        }
    }
}