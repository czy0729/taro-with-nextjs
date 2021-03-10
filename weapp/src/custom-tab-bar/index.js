/*
 * @Author: czy0729
 * @Date: 2021-02-25 17:51:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-10 17:23:14
 */
import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, c } from '@/utils'
import Image from '@/components/c-image'
import tabbarStore from '@/stores/tabbar'
import { imageTarBarPublish } from '@/constants/images'
import Preview from './preview'
import { listDS } from './ds'
import styles from './index.module.scss'

export default observer(
  class CustomTabBar extends React.Component {
    state = {
      show: false
    }

    switchTab = (pagePath, selected) => {
      tabbarStore.setSelected(selected)
      Taro.switchTab({
        url: pagePath
      })
    }

    onShow = () => {
      this.setState({
        show: true
      })
    }

    onClose = () => {
      this.setState({
        show: false
      })
    }

    render() {
      const { selected } = tabbarStore
      const { show } = this.state
      return (
        <View className={styles.tabBar}>
          <View className={styles.tabBarWrap}>
            <Preview show={show} onClose={this.onClose} />
            <View className={styles.flex}>
              {listDS.map((item, index) => {
                const isSelected = selected === index
                if (item.pagePath === 'add') {
                  return (
                    <View
                      key={item.pagePath}
                      className={styles.item}
                      onClick={this.onShow}
                    >
                      <Image
                        width={68}
                        src={imageTarBarPublish}
                        mode='aspectFit'
                      />
                    </View>
                  )
                }

                return (
                  <View
                    key={item.pagePath}
                    className={styles.item}
                    onClick={() => this.switchTab(item.pagePath, item.selected)}
                  >
                    <View className={styles.flexColumn}>
                      <Image
                        width={38}
                        src={isSelected ? item.selectedIconPath : item.iconPath}
                        mode='aspectFit'
                      />
                      <Text
                        className={c(styles.text, {
                          [styles.textActive]: isSelected
                        })}
                      >
                        {item.text}
                      </Text>
                    </View>
                  </View>
                )
              })}
            </View>
          </View>
        </View>
      )
    }
  }
)
