/*
 * @Author: czy0729
 * @Date: 2021-03-16 13:52:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 14:07:34
 */
import React from 'react'

function Button({ children, ...other }) {
  return (
    <button type='button' {...other}>
      {children}
    </button>
  )
}

export { Button }
