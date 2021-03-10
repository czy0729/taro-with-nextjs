/*
 * @Author: czy0729
 * @Date: 2021-02-24 16:34:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-24 16:35:01
 */
import React from 'react'

export default function View({ children, ...other }) {
  return <div {...other}>{children}</div>
}
