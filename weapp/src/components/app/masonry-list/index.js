/*
 * @Author: czy0729
 * @Date: 2021-03-01 09:45:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-10 17:24:47
 */
import React from 'react'
import { View } from '@tarojs/components'
import { sfc, c } from '@/utils'
import { LIST_EMPTY } from '@/constants'
import Item from './item'
import styles from './index.module.scss'

const imageWidth = 336
const infoHeight = 104
function group(
  data = [],
  left = [],
  right = [],
  leftHeight = 0,
  rightHeight = 0
) {
  const _data = data.slice()
  _data.forEach(item => {
    const currentHeight = Math.floor(
      (imageWidth / (item.width || 750)) * (item.height || 590)
    )

    if (leftHeight <= rightHeight) {
      leftHeight += currentHeight + infoHeight
      left.push({
        ...item,
        height: currentHeight
      })
    } else {
      rightHeight += currentHeight + infoHeight
      right.push({
        ...item,
        height: currentHeight
      })
    }
  })

  return {
    left,
    right,
    leftHeight,
    rightHeight
  }
}

class MasonryList extends React.Component {
  state = {
    count: 0
  }

  leftHeight = 0
  rightHeight = 0
  left = []
  right = []

  constructor(props) {
    super(props)

    const { data } = props
    this.group(data)
  }

  componentWillReceiveProps({ data }) {
    this.group(data)

    const { count } = this.state
    this.setState({
      count: count + 1
    })
  }

  group = data => {
    const { left, right, leftHeight, rightHeight } = group(data)
    this.left = left
    this.right = right
    this.leftHeight = leftHeight
    this.rightHeight = rightHeight
  }

  get length() {
    return this.left.length + this.right.length
  }

  renderItem(item) {
    const {
      itemClass,
      innerClass,
      type,
      editing,
      editingIds,
      showToEdit,
      onClick,
      onEdit
    } = this.props
    const { author = {} } = item
    return (
      <Item
        key={item.id}
        itemClass={itemClass}
        innerClass={innerClass}
        detailId={item.id}
        type={item.type || type}
        model={item.model}
        url={item.cover}
        src={item.src}
        user={author.name || item.username}
        avatar={author.avatar || item.user_cover}
        width={item.width}
        height={item.height}
        title={item.title !== '图片' && item.title}
        like={item.like}
        count={item.pv}
        time={item.time}
        statusName={item.statusName}
        editing={editing}
        showToEdit={showToEdit}
        selected={editingIds.includes(item.id)}
        onClick={
          typeof onClick === 'function' ? () => onClick(item) : undefined
        }
        onEdit={() => onEdit(item)}
      />
    )
  }

  render() {
    const { className } = this.props
    const { count } = this.state
    return (
      <View
        className={c(
          styles.masonryList,
          className,
          `masonryList--cacule-${count}`
        )}
      >
        <View className='flex flex-align-start'>
          <View className={c(styles.side, 'flex-1')}>
            {this.left.map(item => this.renderItem(item))}
          </View>
          <View className={c(styles.side, 'flex-1 ml-16')}>
            {this.right.map(item => this.renderItem(item))}
          </View>
        </View>
      </View>
    )
  }
}

export default sfc(MasonryList, {
  className: '',
  itemClass: '',
  innerClass: '',
  type: '',
  editing: false,
  editingIds: [],
  showToEdit: false,
  data: LIST_EMPTY,
  onClick: null,
  onEdit: Function.prototype
})
