/*
 * @Author: czy0729
 * @Date: 2021-02-24 16:37:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-27 20:23:18
 */
import React from 'react'
import Page, { getStaticProps } from '@/pages/index'
import CustomTabBar from '@@/components/custom-tab-bar'

export default function Index() {
  return (
    <>
      <Page />
      <CustomTabBar />
    </>
  )
}

export { getStaticProps }
