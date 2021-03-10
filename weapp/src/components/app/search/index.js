/*
 * @Author: czy0729
 * @Date: 2019-06-12 14:46:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-25 16:00:23
 */
import React from 'react'
import { Text } from '@tarojs/components'
import Link from '@/components/link'
import Iconfont from '@/components/iconfont'
import { sfc, c } from '@/utils'
import styles from './index.module.scss'

function Search({ className, params }) {
  return (
    <Link
      className={c(styles.search, 'flex flex-justify-center', className)}
      href={{
        pathname: 'search',
        query: params
      }}
    >
      <Iconfont className='t-32 l-40 t-sub' name='search' />
      <Text className='t-28 l-40 t-sub ml-8'>搜索</Text>
    </Link>
  )
}

export default sfc(Search, {
  className: '',
  params: {}
})
