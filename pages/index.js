/*
 * @Author: czy0729
 * @Date: 2021-02-24 16:37:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 11:02:54
 */
import React from 'react'
import Page, { getServerSideProps } from '@/pages/index'
import CustomTabBar from '@@/components/custom-tab-bar'

export default function Index() {
  return (
    <>
      <Page />
      <CustomTabBar />
    </>
  )
}

export { getServerSideProps }
