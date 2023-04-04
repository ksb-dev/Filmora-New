import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.scss'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import { MovieProvider } from './context/context'
//import { disableReactDevTools } from "@fvilers/disable-react-devtools";

//if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MovieProvider>
        <App />
      </MovieProvider>
    </Provider>
  </React.StrictMode>
)
