/*
 * @Author: czy0729
 * @Date: 2021-02-25 16:08:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-25 16:37:40
 */
import React from 'react'
import Link from '@/components/link'
import CImage from '@/components/c-image'
import { c } from '@/utils'
import { imageZtHead } from '@/constants/images'
import styles from './index.module.scss'

function Zt() {
  return (
    <Link
      className={c(styles.zt, 'flex')}
      href={{
        pathname: 'classroom',
        query: {
          id: 649
        }
      }}
    >
      <CImage src={imageZtHead} width={96} height={28} mode='aspectFit' />
    </Link>
  )
}

export default Zt
