/*
 * @Author: czy0729
 * @Date: 2019-10-26 15:34:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-26 17:17:48
 */
import React from 'react'
import { View, Text } from '@tarojs/components'
import ActivityIndicator from '@/components/activity-indicator'
import Empty from '@/components/empty'
import { sfc, c } from '@/utils'
import { LIST_EMPTY } from '@/constants'
import styles from './index.module.scss'

function AppActivityIndicator({
  className,
  emptyClassName,
  style,
  loading,
  list,
  pagination,
  text
}) {
  const isEnd = pagination.page >= pagination.pageTotal
  return list && list.length === 0 ? (
    isEnd ? (
      // 空
      <View
        className={c(styles.empty, 'flex flex-justify-center', emptyClassName)}
      >
        <Empty text={text} />
      </View>
    ) : (
      // loading
      <View
        className={c(styles.empty, 'flex flex-justify-center', emptyClassName)}
      >
        <ActivityIndicator show={loading} />
      </View>
    )
  ) : (
    // 没有更多
    <View
      className={c(
        styles.activityIndicator,
        'flex flex-justify-center',
        className
      )}
      style={style}
    >
      {loading && <ActivityIndicator show={loading} />}
      {!loading && isEnd && (
        <Text className={c(styles.end, 't-22 l-32 t-extra t-c')}>
          没有更多了
        </Text>
      )}
    </View>
  )
}

export default sfc(AppActivityIndicator, {
  className: '',
  emptyClassName: '',
  style: null,
  list: '',
  loading: false,
  pagination: LIST_EMPTY.pagination,
  text: ''
})
