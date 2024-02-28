import ReactDOM from "react-dom/client";
import { AppRouter } from "./router/AppRouter";

import "../src/styles/index.css";

import { AppProvider } from "./providers/AppProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<AppProvider>
		<AppRouter />
	</AppProvider>
);
