import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.scss'
import App from './App'
import { Provider } from 'react-redux'
import store from './Redux/Store'
import { MovieProvider } from './context/context'

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
