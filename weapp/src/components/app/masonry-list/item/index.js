/*
 * @Author: czy0729
 * @Date: 2021-03-01 09:47:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-01 11:55:52
 */
import React from 'react'
import { View, Text } from '@tarojs/components'
import CImage from '@/components/c-image'
import Iconfont from '@/components/iconfont'
import TagDark from '@/components/app/tag/dark'
import Link, { push } from '@/components/link'
import { sfc, c, oss, formatCount } from '@/utils'
import { getAppLocation } from '@/utils/app'
import {
  imageMasonryListEdit,
  imageMasonryListRadio,
  imageMasonryListRadioChecked
} from '@/constants/images'
import styles from './index.module.scss'

class Item extends React.Component {
  onClick = e => {
    const { onClick } = this.props
    onClick(e)
  }

  onEdit = e => {
    e.stopPropagation()
    e.preventDefault()

    const { detailId, type } = this.props
    if (this.canEdit) {
      if (type === 'images') {
        push('publish/photos', {
          id: detailId
        })
        return
      }

      push('publish/case', {
        id: detailId
      })
      return
    }

    this.onClick(e)
  }

  get canEdit() {
    const { statusName, editing, showToEdit } = this.props
    return showToEdit && !editing && statusName !== '待审核'
  }

  get showTag() {
    const { statusName } = this.props
    return !!statusName && statusName !== '审核通过'
  }

  get showAvatar() {
    const { user, avatar } = this.props
    return !!user && !!avatar
  }

  get isVideo() {
    const { type } = this.props
    return type === 'video'
  }

  /**
   * 个人中心审核状态标签
   */
  renderUserPublishTag() {
    const { statusName } = this.props
    return (
      this.showTag && (
        <View className={styles.tag}>
          <TagDark type='yellow' text={statusName} />
        </View>
      )
    )
  }

  /**
   * 个人中心编辑中层
   */
  renderEditLayout() {
    const { editing, selected } = this.props
    return (
      <View className={styles.editing} onClick={this.onEdit}>
        {this.canEdit && <CImage width={44} src={imageMasonryListEdit} />}
        {editing && (
          <CImage
            width={44}
            src={
              selected ? imageMasonryListRadioChecked : imageMasonryListRadio
            }
          />
        )}
      </View>
    )
  }

  /**
   * 媒体层
   */
  renderMedia() {
    const { url, height } = this.props
    return (
      <View className={styles.media}>
        <CImage
          className={styles.mediaImage}
          src={url}
          width={351}
          height={height}
        />
        {this.isVideo && (
          <View className={c(styles.mediaVideo, 'flex flex-justify-center')}>
            <Iconfont className='t-20--h5 t-plain' name='play-fill' />
          </View>
        )}
      </View>
    )
  }

  /**
   * 信息层
   */
  renderInfo() {
    const { model, user, avatar, title, like, count, innerClass } = this.props
    return (
      model !== 'zt/forum5th' && (
        <View className={c(styles.inner, innerClass)}>
          {!!title && (
            <View className='mb-12'>
              <Text className='t-26 l-40 t-title t-c2'>{title}</Text>
            </View>
          )}
          <View className='flex'>
            {!like && (
              <View className='flex flex-1 mr-24'>
                {this.showAvatar && (
                  <CImage
                    className='mr-8'
                    src={oss(avatar, 64)}
                    width={32}
                    round
                  />
                )}
                {!!user && (
                  <Text className='flex-1 t-22 l-32 t-sub t-c1'>{user}</Text>
                )}
              </View>
            )}
            {!!like && (
              <Iconfont className='t-22 l-32 t-icon mr-8' name='good' />
            )}
            {!!like && (
              <Text className='t-22 l-32 t-sub mr-24'>{formatCount(like)}</Text>
            )}
            <Iconfont className='t-22 l-32 t-icon mr-8' name='view' />
            {!!count && (
              <Text className='t-22 l-32 t-sub'>{formatCount(count)}</Text>
            )}
          </View>
        </View>
      )
    )
  }

  render() {
    const {
      detailId,
      itemClass,
      editing,
      type,
      model,
      onClick,
      onEdit
    } = this.props
    if (editing || typeof onClick === 'function') {
      return (
        !!detailId && (
          <View
            className={c(styles.item, itemClass)}
            onClick={editing ? onEdit : onClick}
          >
            {this.renderUserPublishTag()}
            {this.renderEditLayout()}
            {this.renderMedia()}
            {this.renderInfo()}
          </View>
        )
      )
    }

    const pathname = getAppLocation(model || type)
    return (
      !!detailId && (
        <Link
          className={c(styles.item, itemClass)}
          href={{
            pathname,
            query: {
              id: detailId
            }
          }}
        >
          {this.renderUserPublishTag()}
          {this.renderEditLayout()}
          {this.renderMedia()}
          {this.renderInfo()}
        </Link>
      )
    )
  }
}

export default sfc(Item, {
  detailId: '',
  model: '',
  type: '',
  url: '',
  src: '',
  width: 0,
  height: 0,
  user: '',
  avatar: '',
  title: '',
  like: 0,
  count: '',
  time: '',
  statusName: '',
  editing: false,
  showToEdit: false,
  selected: false,
  innerClass: '',
  onClick: null
})
