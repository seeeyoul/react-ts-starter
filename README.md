# react-ts-starter
一个自己搭建的脚手架工具🔧
使用了webpack ➕ Typescript ➕ React

项目目录：
```
📦react-ts-starter
 ┣ 📂.git
 ┣ 📂public
 ┃ ┗ 📜index.html
 ┣ 📂scripts
 ┃ ┣ 📂config
 ┃ ┃ ┣ 📜webpack.common.js
 ┃ ┃ ┣ 📜webpack.dev.js
 ┃ ┃ ┗ 📜webpack.prod.js
 ┃ ┣ 📜.DS_Store
 ┃ ┗ 📜constant.js
 ┣ 📂src
 ┃ ┣ 📂typings
 ┃ ┃ ┗ 📜file.d.ts
 ┃ ┣ 📂utils
 ┃ ┣ 📜app.tsx
 ┃ ┣ 📜index.scss
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜proxy.js
 ┣ 📜.DS_Store
 ┣ 📜.babelrc
 ┣ 📜.commitlintrc.js
 ┣ 📜.editorconfig
 ┣ 📜.eslintignore
 ┣ 📜.eslintrc.js
 ┣ 📜.gitignore
 ┣ 📜.npmrc
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc
 ┣ 📜.stylelintrc.js
 ┣ 📜LICENSE
 ┣ 📜README.md
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜tsconfig.json
```
规范角度
• EditorConfig 统一编辑器风格
• Prettier 统一项目风格的
• ESLint 解决代码规范
• StyleLint 统一样式风格
使用插件 eslint-config-prettier ，禁用所有和 prettier 起冲突的规则
•  lint-staged 对我们 git 缓存区最新改动过的文件进行以上的格式化和 lint 规则校验
•  借助husky提供的一些钩子，比如执行 git commit 之前的钩子 pre-commit ，借助这个钩子我们就能执行 lint-staged 所提供的代码文件格式化及 lint 规则校验
{
    "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint --config .commitlintrc.js -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js}": [
      "eslint --config .eslintrc.js"
    ],
    "*.{css,less,scss}": [
      "stylelint --config .stylelintrc.js"
    ],
    "*.{ts,tsx,js,json,html,yml,css,less,scss,md}": [
      "prettier --write"
    ]
  },
}
• commitlint 检验 git commit 时的 message 格式是否符合规范
// commitlintrc.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'anno'],
    ],
  },
}
/**
 * build : 改变了build工具 如 webpack
 * ci : 持续集成新增
 * chore : 构建过程或辅助工具的变动
 * feat : 新功能
 * docs : 文档改变
 * fix : 修复bug
 * perf : 性能优化
 * refactor : 某个已有功能重构
 * revert : 撤销上一次的 commit
 * style : 代码格式改变
 * test : 增加测试
 */
webpack
基础
• webpack 
• webpack cli 命令行运行webpack
• webpack-merge 区分开发环境和生产环境
• webpack-dev-server 本地起一个http服务器
• html-webpack-plugin 将打包后的 js 文件自动引进 html 文件中
• clean-webpack-plugin 每次打包前先处理掉之前的 dist 目录
• style-loader css-loader 样式处理
• file-loader url-loader 处理本地资源文件
支持react
• react react-dom 
• babel-loader
• @types typescript
优化
• copy-webpack-plugin 拷贝静态资源
• webpackbar 显示打包进度
• hard-source-webpack-plugin 提供中间缓存
• external 减少代码体积
// webpack.common.js
module.exports = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
• splitChunks https://www.cnblogs.com/kwzm/p/10314438.html
• 开启热更新
1. devServer下的hot设置为true
2. 使用webpack.HotModuleReplacementPlugin()
• mini-css-extract-plugin抽离css样式
• purgecss-webpack-plugin glob 去除无用样式
plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
    }),
• terser-webpack-plugin 和 optimize-css-assets-webpack-plugin对js和css代码进行压缩
  optimization: {
    minimizer: [
      !isDev && new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        }
      }),
      
      !isDev && new OptimizeCssAssetsPlugin()
    ].filter(Boolean),
  },
}
• webpack-bundle-analyzer 打包后代码进行一个可视化分析
### TODO
使用thread loader优化打包速度
