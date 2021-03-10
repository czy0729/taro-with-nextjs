/*
 * @Author: czy0729
 * @Date: 2020-11-23 17:46:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-10 14:58:08
 */
import { observable } from 'mobx'

const tabbarStore = observable({
  selected: 0,

  setSelected(selected) {
    this.selected = selected
  }
})

export default tabbarStore
