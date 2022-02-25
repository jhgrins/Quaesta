import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const outputDirectory = "../dist";
const mode = process.env.NODE_ENV || "development";

export default {
	entry: "./frontend/index.tsx",
	devServer: {
		static: {
			directory: path.resolve(__dirname, outputDirectory)
		},
		port: 3000,
		open: true,
		hot: true,
		historyApiFallback: {
			rewrites: [
				{
					from: /^\/.+\..+$/,
					to: function (context) {
						const f = context.parsedUrl.pathname.split("/");
						return "/" + f[f.length - 1];
					}
				}
			]
		},
		proxy: { "/graphql": "http://localhost:8000/dev" }
	},
	devtool: "eval-source-map",
	mode: mode,
	module: {
		rules: [
			{
				test: /\.?tsx?$/,
				exclude: /node_modules/,
				use: [{ loader: "ts-loader", options: { onlyCompileBundledFiles: true } }]
			},
			{ test: /\.css$/i, use: ["style-loader", "css-loader"] },
			{
				test: /\.s[ac]ss$/i,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: { plugins: ["autoprefixer"] }
						}
					},
					{ loader: "sass-loader" }
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|png|svg|jpe?g|gif|mp4|wav|mp3)$/i,
				use: [{ loader: "file-loader" }]
			}
		]
	},
	output: { filename: "bundle.js", path: path.join(__dirname, outputDirectory), publicPath: "/" },
	plugins: [
		new HtmlWebpackPlugin({
			template: "./frontend/static/template/index.html",
			favicon: "./frontend/static/template/favicon.ico",
			title: "Quaesta"
		}),
		new CopyPlugin({
			patterns: [
				{ from: "./frontend/static/images", to: "./images" },
				{ from: "./frontend/static/email", to: "./email" }
			]
		}),
		new webpack.DefinePlugin({
			IS_OFFLINE: mode === "development",
			GRAPHQL_ENDPOINT: `"${process.env.GRAPHQL_ENDPOINT || "/graphql"}"`,
			WEBSOCKET_ENDPOINT: `"${process.env.WEBSOCKET_ENDPOINT || "ws://localhost:8001"}"`
		})
	],
	resolve: {
		extensions: ["", ".ts", ".tsx", ".js", ".jsx"]
	},
	stats: "minimal"
};
