/*
 * @Author: czy0729
 * @Date: 2021-02-24 16:34:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 14:07:25
 */
import React from 'react'

function View({ children, ...other }) {
  return <div {...other}>{children}</div>
}

export { View }
