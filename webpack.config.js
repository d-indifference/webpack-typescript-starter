/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

class Modes {
	static IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

	static IS_PRODUCTION = !this.IS_DEVELOPMENT;
}

class Paths {
	static SRC = path.resolve(__dirname, 'src');

	static DIST = path.resolve(__dirname, 'dist');
}

const SERVER_PORT = 3000;

module.exports = {
	mode: Modes.IS_PRODUCTION ? 'production' : 'development',
	entry: path.resolve(Paths.SRC, 'index.ts'),
	target: 'web',
	devtool: Modes.IS_DEVELOPMENT ? 'source-map' : false,
	devServer: {
		port: SERVER_PORT,
		hot: Modes.IS_DEVELOPMENT,
		static: true
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.css'],
		alias: {
			'@': Paths.SRC,
			'@css': `${Paths.SRC}/css`
		}
	},
	output: {
		filename: Modes.IS_PRODUCTION ? 'bundle.[contenthash].js' : 'bundle.js',
		path: Paths.DIST
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(Paths.SRC, 'index.html')
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(Paths.SRC, 'favicon.ico'),
					to: Paths.DIST
				}
			]
		}),
		new ESLintPlugin({
			useEslintrc: true,
			fix: true,
			eslintPath: require.resolve('eslint'),
			extensions: ['ts']
		})
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: Modes.IS_DEVELOPMENT
								? 'tsconfig.json'
								: 'tsconfig.prod.json'
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.png$/,
				loader: 'file-loader',
				options: {
					name: Modes.IS_DEVELOPMENT
						? '[name].[ext]'
						: '[hash].[ext]',
					type: 'asset/resource',
					outputPath: 'img'
				}
			}
		]
	}
};
