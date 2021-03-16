/*
 * @Author: czy0729
 * @Date: 2020-03-02 16:15:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 14:04:30
 */
import React from 'react'
import { View, Text } from '@tarojs/components'
import CImage from '@/components/c-image'
import CButton from '@/components/c-button'
import { sfc, c, push, oss } from '@/utils'
import styles from './index.module.scss'

function Info({
  author,
  authorId,
  authorType,
  title,
  avatar,
  zhuanlan,
  isFollow = false,
  isPreview = false,
  onFollow = Function.prototype
}) {
  return (
    <View className={styles.info}>
      <Text
        className={c(
          't-42 l-56 t-title t-b',
          title || !isPreview ? '' : 't-extra'
        )}
      >
        {title || (isPreview ? '未填写标题' : '')}
      </Text>
      {!!author && (
        <View className='mt-32'>
          {authorType === 'author' && zhuanlan !== 0 ? (
            <View
              className={c(styles.author, 'flex')}
              onClick={() => {
                push('zhuanlan', {
                  id: authorId
                })
              }}
            >
              {avatar && (
                <CImage
                  className='mr-16'
                  width={72}
                  src={oss(avatar, 64)}
                  round
                />
              )}
              <View className='flex-1'>
                <View className='flex'>
                  <Text className='t-24 t-desc t-b l-34'>{author}</Text>
                </View>
                <Text
                  className='t-20--h5 l-32 t-main'
                  style={{
                    transformOrigin: 'left center'
                  }}
                >
                  专栏作家
                </Text>
              </View>
              <View>
                <CButton
                  type='ghost-primary'
                  size='mini'
                  text={isFollow ? '已关注' : '关注'}
                  delay={false}
                  onClick={e => {
                    e.stopPropagation()
                    onFollow()
                  }}
                />
              </View>
            </View>
          ) : (
            <View className='flex'>
              {avatar && (
                <CImage
                  className='mr-16'
                  width={40}
                  src={oss(avatar, 64)}
                  round
                />
              )}
              <Text className='t-24 t-desc t-b l-34'>{author}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default sfc(Info)
