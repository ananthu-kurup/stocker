const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');


const serverConfig = (env) =>{
  const isDev = env.mode != 'production';

  return {
    entry: './server/index.ts',
    mode: isDev ? 'development' : 'production',
    watch: isDev,
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'dist', 'server'),
      filename: 'index.js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            'ts-loader',
          ]
        }
      ]
    },
    externals: [ nodeExternals() ],
    plugins: [
      new WebpackShellPluginNext({
        onBuildEnd: {
          scripts: ['yarn run:dev'],
          blocking: false,
          parallel: true
        }
      })
    ]
  }
} 


module.exports = [ serverConfig ];
