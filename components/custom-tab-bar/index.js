/*
 * @Author: czy0729
 * @Date: 2021-02-25 17:51:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-01 15:22:14
 */
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Link from '@@/components/link'
import Image from '@@/components/c-image'
import { sfc, c } from '@/utils'
import Preview from './preview'
import { listDS } from './ds'
import styles from './index.module.scss'

const imagePublish = '/images/tab-bar/publish.png'

class CustomTabBar extends Component {
  state = {
    showPreview: false
  }

  showPreview = () => {
    this.setState({
      showPreview: true
    })
  }

  closePreview = () => {
    this.setState({
      showPreview: false
    })
  }

  render() {
    const { selected } = this.props
    const { showPreview } = this.state
    return (
      <View className={styles.tabBar}>
        <View className={styles.tabBarWrap}>
          <Preview show={showPreview} onClose={this.closePreview} />
          <View className='flex'>
            {listDS.map((item, index) => {
              const isSelected = selected === index
              if (item.pagePath === 'add') {
                return (
                  <View
                    key={item.pagePath}
                    className={styles.item}
                    style={{
                      marginTop: -2
                    }}
                    onClick={this.showPreview}
                  >
                    <Image
                      className={styles.publish}
                      src={imagePublish}
                      mode='aspectFit'
                    />
                  </View>
                )
              }

              return (
                <Link
                  key={item.pagePath}
                  className={styles.item}
                  href={item.pagePath}
                >
                  <View className='flex flex-column'>
                    <Image
                      className={styles.thumb}
                      src={isSelected ? item.selectedIconPath : item.iconPath}
                    />
                    <Text
                      className={c('t-20 l-24 mt-8', {
                        [styles.text]: !isSelected,
                        [styles.textActive]: isSelected
                      })}
                    >
                      {item.text}
                    </Text>
                  </View>
                </Link>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}

export default sfc(CustomTabBar, {
  selected: 0
})
