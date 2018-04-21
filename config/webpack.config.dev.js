

const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const getClientEnvironment = require('./env')
const paths = require('./paths')

// 定义服务器目录路径
const publicPath = '/'

// 在index.html中用%PUBLIC_URL%使用，在js中用process.env.PUBLIC_URL使用
const publicUrl = ''

// 将定义的环境变量注入app中
const env = getClientEnvironment(publicUrl)

module.exports = {
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  entry: [
    // promise、object.assign等新语法支持
    require.resolve('./polyfills'),
    // 替代WebpackDevServer服务器的热部署
    // 错误提示
    require.resolve('react-dev-utils/webpackHotDevClient'),
    // app代码
    paths.appIndexJs,
  ],
  output: {
    // 告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释
    pathinfo: true,
    // 不会创建一个真实的文件，只是一个相对于WebpackDevServer运行时的虚拟路径
    filename: 'static/js/bundle.js',
    // 如果进行代码拆分，会有附加的代码块
    chunkFilename: 'static/js/[name].chunk.js',
    // 此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」。
    // 相对 URL(relative URL) 会被相对于 HTML 页面（或 <base> 标签）解析。
    // 相对于服务的 URL(Server-relative URL)，相对于协议的 URL(protocol-relative URL)
    // 或绝对 URL(absolute URL) 也可是可能用到的，或者有时必须用到，例如：当将资源托管到 CDN 时。
    publicPath,
    // 自定义每个 source map 的 sources 数组中使用的名称(在windows下用/替换\\)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    // 告诉 webpack 解析模块时应该搜索的目录
    modules: ['node_modules', paths.appNodeModules].concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
    // 自动解析确定的扩展
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      'react-native': 'react-native-web',
    },
    // 应该使用的额外的解析插件列表
    plugins: [
      // 防止用户从src目录以外的路径导入文件
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),

            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        // 当规则匹配时，只使用第一个匹配规则
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 使某些变量能在index.html中访问，比如 %PUBLIC_URL%
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      // true 将所有的js资源注入到这个index.html中
      inject: true,
      template: paths.appHtml,
    }),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
    new webpack.NamedModulesPlugin(),

    // 创建一个在编译时可以配置的全局常量
    new webpack.DefinePlugin(env.stringified),

    // 启用热替换模块(Hot Module Replacement)，也被称为 HMR
    new webpack.HotModuleReplacementPlugin(),

    // 路径区分大小写
    new CaseSensitivePathsPlugin(),

    // 插件允许你安装库后自动重新构建打包文件
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),

    // 忽略 moment 的本地化内容
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // 配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你
  performance: {
    hints: false,
  },
}
