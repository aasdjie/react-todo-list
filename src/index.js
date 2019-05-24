import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import App from './App'
import HelloWorld from './components/helloworld'
import * as serviceWorker from './serviceWorker'

const name = 'super man'
// ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'))
// ReactDOM.render(<HelloWorld name={name} />, document.getElementById('root'))
ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
