/*
 * @Author: czy0729
 * @Date: 2019-07-01 16:57:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-10 17:23:28
 */
import React from 'react'
import { View, Text } from '@tarojs/components'
import Link, { push } from '@/components/link'
import CImage from '@/components/c-image'
import { c, checkLogin } from '@/utils'
import { imagePreviewMoment } from '@/constants/images'
import { screenHeight } from '@/constants/style'
import { menuDS } from '../ds'
import styles from './index.module.scss'

export default class Preview extends React.Component {
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
          className={styles.topImg}
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
        <View className={styles.flex}>
          {menuDS.map(item => (
            <View
              key={item.text}
              className={styles.publishItem}
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
              <View className={styles.flexCenter}>
                {!!item.iconImg && (
                  <CImage
                    width={88}
                    height={88}
                    mode='aspectFit'
                    round
                    src={item.iconImg}
                  />
                )}
              </View>
              <Text className={styles.publishText}>{item.text}</Text>
            </View>
          ))}
        </View>
        <View className={styles.publishBtn}>
          <View
            className={c(styles.publishBtnWrap, styles.flexCenter)}
            onClick={onClose}
          >
            <View className={styles.publishBtnIcon} />
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
          {this.renderTop()}
          {this.renderPublish()}
        </View>
      </View>
    )
  }
}
