/* eslint-disable react/destructuring-assignment */
/*
 * @Author: czy0729
 * @Date: 2021-02-25 17:24:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-01 14:19:06
 */
import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import * as stores from '@/stores'
import './styles/index.scss'

class App extends Component {
  render() {
    return <Provider store={stores}>{this.props.children}</Provider>
  }
}

export default App
