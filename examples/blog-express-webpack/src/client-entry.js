import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './app'

const { props } = window.__INITIAL_STATE__

ReactDOM.hydrate(<App {...props} />, document.querySelector('#root'))
