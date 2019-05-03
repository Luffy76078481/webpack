const path = require('path');
/*
 定义模板文件html,最终js和CSS都会挂载在这个模板文件上
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
/*
每次打包，这个插件都会检查注册在 entry 中的第三方库是否发生了变化，
如果没有变化，插件就会使用缓存中的打包文件，减少了打包的时间，这时 Hash 也不会变化。
*/
const AutoDllPlugin = require('autodll-webpack-plugin');
/*
抽取 CSS 到单文件
*/
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: {//入口文件，可以多个入口，参数为数组
        bundle: path.resolve(__dirname, '../src/index.js')
    },
    output: {//输出文件  publicPath定义所有资源路径的起始位置在哪儿
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js',
        // publicPath:"/",
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.vue'], //方便引入依赖或者文件的时候可以省略后缀
        alias: { //配置引入模块的别名   方便引入不用写那么长
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),

        }
    },
    module: {
        rules: [{//各种加载编译loader
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            { //autoprefixer 插件为我们的 css 代码自动添加前缀以适应不同的浏览器。
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new VueLoaderPlugin(),
        new AutoDllPlugin({
            inject: true, // 插件会自动把打包出来的第三方库文件插入到 HTML
            debug: true,
            filename: '[name]_[hash].js', //打包后文件的名称
            path: './dll', //是打包后的路径
            entry: { //入口
                //vendor 指定的名称，数组内容就是要打包的第三方库的名称，不要写全路径，Webpack 会自动去 node_modules 中找到的。
                vendor: ['vue', 'vue-router', 'vuex']
            }
        }),
        new webpack.optimize.SplitChunksPlugin(),//提取共同代码：
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
         //提供全局的变量，在模块中使用无需用require引入
        new webpack.ProvidePlugin({
            $config: [path.resolve(__dirname, '../src/data/config.js'), 'default'],
        }),

    ]
};