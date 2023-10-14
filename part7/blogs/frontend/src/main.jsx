import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './reducers/notificationReducer'


const store = configureStore({
	reducer:{
		notification:notificationReducer
	}
})
//console.log(store)
ReactDOM.createRoot(document.getElementById("root")).render(
	
	<Provider store={store} >
		<App />
	</Provider>
)
