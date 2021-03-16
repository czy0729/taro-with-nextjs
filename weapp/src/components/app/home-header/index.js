/*
 * @Author: czy0729
 * @Date: 2021-02-24 17:36:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 12:00:19
 */
import React from 'react'
import { View, Text } from '@tarojs/components'
import Link from '@/components/link'
import Zt from '@/components/app/zt'
import Search from '@/components/app/search'
import { c, sfc } from '@/utils'
import styles from './index.module.scss'

export const H_HOME_HEADER = 96

const items = [
  {
    title: '发现',
    path: 'index'
  },
  {
    title: '品牌',
    path: 'brand'
  },
  {
    title: '产品',
    path: 'product'
  },
  {
    title: '项目',
    path: 'project'
  }
]

function HomeHeader({ className, selected = 0 }) {
  return (
    <View>
      <View className={styles.placeholder} />
      <View className={c(styles.homeHeader, className, 'flex')}>
        {items.map((item, index) => {
          const isActive = index === selected || item.path === selected
          return (
            <Link
              key={item.title}
              className={c(
                styles.item,
                {
                  [styles.itemActive]: isActive
                },
                'flex flex-justify-center'
              )}
              href={{
                pathname: item.path,
                query: item.options
              }}
              replace
            >
              <Text
                className={c(
                  {
                    't-36': isActive,
                    't-28': !isActive
                  },
                  'l-48'
                )}
              >
                {item.title}
              </Text>
            </Link>
          )
        })}
        <Zt />
        <Search />
      </View>
    </View>
  )
}

export default sfc(HomeHeader)
