/*
 * @Author: czy0729
 * @Date: 2021-02-26 10:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-10 17:27:16
 */
import React from 'react'
import { View } from '@tarojs/components'
import CScrollView from '@/components/c-scroll-view'
// import Hammer from '@base/hammer'
import MasonryList from '@/components/app/masonry-list'
import ActivityIndicator from '@/components/app/activity-indicator'
import { sfc } from '@/utils'
import { LIST_EMPTY } from '@/constants'
import styles from './index.module.scss'

function List({ data, loading, onPullDownRefresh, onScrollToLower }) {
  const { list, pagination } = data
  return (
    <CScrollView
      className={styles.list}
      showTabBar
      onPullDownRefresh={onPullDownRefresh}
      onScrollToLower={onScrollToLower}
    >
      <View className={styles.scrollView}>
        <MasonryList data={data} />
        <ActivityIndicator
          loading={loading}
          list={list}
          pagination={pagination}
        />
      </View>
      {/* <Hammer onSwiperLeft={() => replace('brand')}>
      </Hammer> */}
    </CScrollView>
  )
}

export default sfc(List, {
  data: LIST_EMPTY,
  loading: false,
  onPullDownRefresh: Function.prototype,
  onScrollToLower: Function.prototype
})
