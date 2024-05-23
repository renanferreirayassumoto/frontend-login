module.exports = {
	devServer: {
		proxy: {
			'/': {
				target: 'https://sistema-produtos-backend-vdgbln1iz.vercel.app', // Substitua pelo URL real do seu backend
				changeOrigin: true,
				ws: true,
			},
		},
	},
};
