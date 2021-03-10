/*
 * @Author: czy0729
 * @Date: 2021-02-24 16:35:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-26 11:19:32
 */
import React from 'react'

export default function Text({ children, ...other }) {
  return <p {...other}>{children}</p>
}
