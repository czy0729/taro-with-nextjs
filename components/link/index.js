/*
 * @Author: czy0729
 * @Date: 2021-02-25 10:49:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 15:27:33
 */
import React from 'react'
import NextLink from 'next/link'
import router from 'next/router'
import { SERVER } from '@/constants'

function Link({ href, replace, children, ...other }) {
  if (typeof href === 'object') {
    return (
      <NextLink
        href={{
          pathname: getPathname(href.pathname),
          query: href.query
        }}
        replace={replace}
      >
        <a {...other}>{children}</a>
      </NextLink>
    )
  }

  if (typeof href === 'string') {
    return (
      <NextLink href={getPathname(href)} replace={replace} {...other}>
        <a {...other}>{children}</a>
      </NextLink>
    )
  }

  return <a {...other}>{children}</a>
}

export default Link

export function push(pathname) {
  return router.push(getPathname(pathname))
}

export function replace(pathname) {
  return router.replace(getPathname(pathname))
}

export function back() {
  return router.back()
}

function getPathname(pathname) {
  if (['/', '//', 'index', 'index/index', ''].includes(pathname)) {
    return '/'
  }
  return `/${pathname}`
}

/**
 * 获取页面参数
 */
export function getQuery(target) {
  return SERVER ? target.props.query || {} : router.query
}
