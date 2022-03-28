import React from 'react'
import ReactDom from 'react-dom'
import AppRouter from './router/AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.scss'

ReactDom.render(<AppRouter />, document.getElementById('root'))