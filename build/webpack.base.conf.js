var path = require('path')
var config = require('./config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../');
var sourcePath = path.resolve(__dirname, '../src');
var webpack = require('webpack')

module.exports = {
    entry: {
        app: config.dev.main
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: '/',
        filename: utils.assetsPath('[name].js'),
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.css'],
        modules: [sourcePath, '../node_modules'],
        alias: {
            'vue$': 'vue/dist/vue',
            'assets': path.resolve(__dirname, '../src/assets'),
            'common': path.resolve(__dirname, '../src/common'),
            'filters': path.resolve(__dirname, '../src/filters'),
            'components': path.resolve(__dirname, '../src/components'),
            'common-elementUI': path.resolve(__dirname, '../src/common/element-ui'),
        }
    },
    module: {
        rules: [/*{
            test: /\.(vue|js)$/,
            use: [{
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            }],
            enforce: 'pre',
            include: sourcePath,
        }, */{
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ['vue-style-loader', 'css-loader'],
                        scss: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
                    }
                }
            }],
        }, {
            test: /\.js$/,
            use: ['babel-loader'],
            include: [sourcePath]
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: utils.assetsPath('/[name].[ext]?[hash]'),
                    publicPath: '../../../',
                    useRelativePath: process.env.NODE_ENV === "production"
                }
            }],
        }, {
            test: /\.(swf|xml)(\?\S*)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    // name: utils.assetsPath('/js/[name].[ext]'),
                    name: utils.assetsPath(`${process.env.NODE_ENV === "production" ? '/js' : ''}/[name].[ext]`),
                    publicPath: '../../../',
                    useRelativePath: process.env.NODE_ENV === "production"
                }
            }],
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: utils.assetsPath('/images/[name]-[hash].[ext]'),
                    publicPath: '../../../',
                    useRelativePath: process.env.NODE_ENV === "production",
                    limit: 10240,
                }
            }]
        }]
    },
    plugins: [new webpack.LoaderOptionsPlugin({
        debug: false,
        options: {
            postcss: [
                require('autoprefixer')({
                    browsers: ['Chrome >= 31']
                })
            ],
        }
    })],
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
}
