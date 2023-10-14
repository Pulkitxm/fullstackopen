import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import usersReducer from "./reducers/usersReducer";

import {
	BrowserRouter as Router
  } from "react-router-dom";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    users: usersReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
