/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			keyframes: {
				authLoader: {
					"0%": {
						transform: "rotate(0deg)"
					},
					"100%": {
						transform: "rotate(360deg)"
					}
				}
			},
			animation: {
				"auth-loader": "authLoader 1s linear infinite"
			}
		}
	},

	plugins: []
};
