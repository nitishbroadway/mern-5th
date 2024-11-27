import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Provider} from "react-redux"
import store from "./store"
import {ToastContainer} from "react-toastify"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Slide
      />
    </Provider>
  </StrictMode>,
)
