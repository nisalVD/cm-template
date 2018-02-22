import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App.js'
import ElementQueries from 'css-element-queries/src/ElementQueries'

ElementQueries.listen()
ElementQueries.init()
ReactDOM.render(<App />, document.getElementById('cm-template'))
