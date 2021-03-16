/*
 * @Author: czy0729
 * @Date: 2020-04-14 16:44:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 15:53:58
 */
import React from 'react'
import { View, Text } from '@tarojs/components'
import Iconfont from '@/components/iconfont'
import { sfc, c, push } from '@/utils'
import { H5 } from '@/constants'
import { menuDS } from './ds'
import styles from './index.module.scss'

class BrandPopMenu extends React.Component {
  state = {
    show: false
  }

  onToggle = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }

  onItemClick = item => {
    const { domain } = this.props
    this.onToggle()
    push(item.path, item.getParams(domain))
  }

  render() {
    if (!H5) return null

    const { domain, children } = this.props
    const { show } = this.state
    return (
      <View
        className={c(styles.wrap, {
          [styles.wrapActive]: show
        })}
      >
        <View onClick={this.onToggle}>{children}</View>
        <View className={styles.menu}>
          {menuDS.map(
            item =>
              ((item.brand && domain) || !item.brand) && (
                <View
                  key={item.name}
                  className={styles.menuItem}
                  onClick={() => this.onItemClick(item)}
                >
                  <Iconfont className={styles.menuIcon} name={item.icon} />
                  <Text className={styles.menuText}>{item.name}</Text>
                </View>
              )
          )}
        </View>
        <View className={styles.mask} onClick={this.onToggle} />
      </View>
    )
  }
}

export default sfc(BrandPopMenu)
