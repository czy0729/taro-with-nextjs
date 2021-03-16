/*
 * @Author: czy0729
 * @Date: 2020-03-20 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 17:03:48
 */
import React from 'react'
import { View, Text } from '@tarojs/components'
import ParserRichText from '@/components/parser-rich-text'
// import ProductItemHorizontal from '@app/product-item-horizontal'
import { sfc, c, getTimestamp, lastDate, formatCount } from '@/utils'
import styles from './index.module.scss'

function Content({ detail = '', product = [], time = '', pv = '' }) {
  return (
    <View>
      <View className={styles.richText}>
        <ParserRichText html={detail} showWithAnimation selectable />
      </View>
      {/* {!!product.length && (
        <View className={styles.products}>
          {product.map(item => (
            <ProductItemHorizontal
              key={item.id}
              cover={item.cover}
              name={item.name}
              desc={item.brand}
              onClick={() => {
                push(item.model === 'article' ? 'item/user' : 'item', {
                  id: item.id
                })
              }}
            />
          ))}
        </View>
      )} */}
      <View className={c(styles.copyright, 'flex')}>
        {!!time && (
          <Text className='flex-1 t-24 l-32 t-title t-extra'>
            发布于 {lastDate(getTimestamp(time))}
          </Text>
        )}
        {!!pv && (
          <Text className='t-24 l-32 t-title t-extra ml-20'>
            阅读 {formatCount(pv)}
          </Text>
        )}
      </View>
    </View>
  )
}

export default sfc(Content)
