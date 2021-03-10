/*
 * @Author: czy0729
 * @Date: 2019-07-01 16:57:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-27 21:29:31
 */
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Link, { push } from '@/components/link'
import CImage from '@/components/c-image'
import Iconfont from '@/components/iconfont'
import { sfc, c, checkLogin } from '@/utils'
import { imagePreviewBg, imagePreviewMoment } from '@/constants/images'
import { screenHeight } from '@/constants/style'
import { menuDS } from '../ds'
import styles from './index.module.scss'

class Preview extends Component {
  renderTop() {
    const { onClose } = this.props
    return (
      <Link
        className={styles.top}
        href={{
          pathname: 'news/detail',
          query: {
            id: 102064
          }
        }}
        onClick={() => {
          setTimeout(() => {
            onClose()
          }, 800)
        }}
      >
        <CImage
          className='ml-auto mr-auto'
          width={600}
          height={160}
          mode='aspectFit'
          src={imagePreviewMoment}
        />
      </Link>
    )
  }

  renderPublish() {
    const { onClose } = this.props
    return (
      <View className={styles.publish}>
        <View className='flex'>
          {menuDS.map(item => (
            <View
              key={item.text}
              className={c(styles.publishItem, 'flex flex-column flex-1')}
              onClick={() => {
                if (!checkLogin()) {
                  push('login')
                } else {
                  push(item.pagePath)
                }

                setTimeout(() => {
                  onClose()
                }, 800)
              }}
            >
              <View className='flex flex-justify-center'>
                {!!item.iconImg && (
                  <CImage
                    className={c(styles.itemIco)}
                    width={88}
                    height={88}
                    mode='aspectFit'
                    round
                    src={item.iconImg}
                  />
                )}
                {!item.iconImg && !!item.icon && (
                  <Iconfont className='t-52 t-title' name={item.icon} />
                )}
              </View>
              <Text className='t-26 l-48 t-title mt-16'>{item.text}</Text>
            </View>
          ))}
        </View>
        <View className={styles.publishBtn}>
          <View
            className={c(styles.publishBtnWrap, 'flex flex-justify-center')}
            onClick={onClose}
          >
            <Iconfont className='t-32 t-sub' name='close' />
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { show } = this.props
    return (
      <View
        className={c(styles.preview, {
          [styles.previewShow]: show
        })}
        style={{
          height: screenHeight
        }}
      >
        <View className={styles.container}>
          <CImage
            className={c(styles.bg)}
            width={750}
            height={750}
            src={imagePreviewBg}
          />
          {this.renderTop()}
          {this.renderPublish()}
        </View>
      </View>
    )
  }
}

export default sfc(Preview, {
  onClose: Function.prototype
})
