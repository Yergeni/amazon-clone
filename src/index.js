import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Notifications (https://www.npmjs.com/package/react-notifications-component)
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import "./index.css";
import 'react-notifications-component/dist/theme.css'

// Context
import { StateProvider } from "./state/providers/State.provider";
import reducer, { initialState } from "./state/reducers/reducer";

ReactDOM.render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<ReactNotification />
			<App />
		</StateProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
