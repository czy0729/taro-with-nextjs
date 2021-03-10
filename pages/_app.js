/*
 * @Author: czy0729
 * @Date: 2021-02-24 20:26:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-27 04:57:04
 */
import React from 'react'
import { Provider, observer } from 'mobx-react'
import * as stores from '@/stores'
import * as utils from '@/utils'
import './app.scss'

class App extends React.Component {
  componentDidMount() {
    window.stores = stores
    window.utils = utils
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider {...stores}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default observer(App)
