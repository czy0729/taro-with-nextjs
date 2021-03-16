/*
 * @Author: czy0729
 * @Date: 2021-02-24 16:35:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 14:07:14
 */
import React from 'react'

function Text({ children, ...other }) {
  return <p {...other}>{children}</p>
}

export { Text }
