import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Store from './store'
import './index.css'

const StoreInstance = Store()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={StoreInstance}>
     <App />
   </Provider>
 </BrowserRouter>
 ,
  document.getElementById('root')
)
