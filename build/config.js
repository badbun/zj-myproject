// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var argvs = process.argv.splice(2);
var projectPath = '';
var projectSrcPath = '../src/';
if (argvs.length > 0 && argvs[0].indexOf('--') == -1) {
    projectPath = argvs[0]+'/';
    projectSrcPath = '../src/components/' + projectPath;
}


module.exports = {
    build: {
        env: JSON.stringify('production'),
        index: path.resolve(__dirname, '../src/'+projectSrcPath+'index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: projectPath+'static',
        assetsPublicPath: '/',
        indexSubDirectory: projectPath,
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: JSON.stringify('development'),
        index: path.resolve(__dirname, '../src/'+projectSrcPath+'index.html'),
        main: path.resolve(__dirname, '../src/'+projectSrcPath+'main.js'),
        port: 9999,
        assetsSubDirectory: projectPath+'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/znbsyapi/api/': {
                target: 'http://192.168.149.178',
                // target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false
            }
        },
        cssSourceMap: false
    }
}
