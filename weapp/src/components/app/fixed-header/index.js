/*
 * @Author: czy0729
 * @Date: 2021-03-16 15:06:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 15:53:29
 */
import React from 'react'
import { View } from '@tarojs/components'
import Iconfont from '@/components/iconfont'
import CImage from '@/components/c-image'
import BrandPopMenu from '@/components/app/brand-pop-menu'
import { sfc, c, push, back } from '@/utils'
import { H5 } from '@/constants'
import { imageLogo } from '@/constants/images'
import styles from './index.module.scss'

export const H_FIXED_HEADER = 98

function FixedHeader({
  className = '',
  domain = '',
  logo = '',
  brand,
  leftIcon = 'angle-left',
  onLeftIconClick = back
}) {
  if (!H5) return null

  const src = logo || brand.logo || imageLogo
  const _domain = domain || brand.domain
  return (
    <View className={c(styles.fixedHeader, 'flex', className)}>
      <Iconfont
        className={styles.icon}
        name={leftIcon}
        onClick={() => {
          if (leftIcon === 'home') {
            if (_domain) {
              return push('brand/detail', {
                domain: _domain
              })
            }

            return push('index')
          }

          return onLeftIconClick()
        }}
      />
      <View className='flex-center flex-1'>
        <CImage
          className={styles.logo}
          width={192}
          height={48}
          src={src}
          mode='aspectFit'
          onClick={() => {
            if (_domain) {
              return push('brand/detail', {
                domain: _domain
              })
            }

            return push('index')
          }}
        />
      </View>
      <BrandPopMenu domain={_domain}>
        <Iconfont className={styles.icon} name='more' />
      </BrandPopMenu>
    </View>
  )
}

export default sfc(FixedHeader)
