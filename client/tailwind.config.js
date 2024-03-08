/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		textColor: {
			inputTitle: "rgba(0, 0, 0, 0.6)"
		},
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
		},
		backgroundColor: {
			optionItem: "rgba(0, 0, 0, 0.08)",
			inputBg: "#f5f5f5"
		}
	},

	plugins: []
};
