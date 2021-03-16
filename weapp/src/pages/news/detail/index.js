/*
 * @Author: czy0729
 * @Date: 2021-03-16 09:57:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 16:00:23
 */
import React from 'react'
import { View } from '@tarojs/components'
import FixedHeader from '@/components/app/fixed-header'
import { contentStore } from '@/stores'
import { observer, getQuery } from '@/utils'
import Info from './info'
import styles from './index.module.scss'

export async function getServerSideProps({ query }) {
  return contentStore.fetchDetail(query)
}

export default observer(
  class NewsDetail extends React.Component {
    contentStore = contentStore

    get query() {
      const { id, domain = '' } = getQuery(this)
      return {
        id,
        domain
      }
    }

    get $detail() {
      return this.contentStore.getState('detail', this.query)
    }

    renderHeader() {
      const { brand } = this.$detail
      return <FixedHeader leftIcon='home' brand={brand} />
    }

    renderContent() {
      const { content } = this.$detail
      const {
        author_info = {},
        body,
        product = [],
        publish_time,
        pv,
        title
      } = content
      const { avatar, id, name, type, zhuanlan } = author_info
      return (
        <View>
          <Info
            author={name}
            authorId={id}
            authorType={type}
            avatar={avatar}
            time={publish_time}
            title={title}
            zhuanlan={zhuanlan}
            // isFollow={this.$isFollow}
            // onFollow={this.onFollow}
          />
          {/* <Content
            detail={body}
            product={product}
            pv={pv}
            time={publish_time}
          /> */}
        </View>
      )
    }

    render() {
      return (
        <View>
          <View className={styles.page}>
            {this.renderHeader()}
            <View className={styles.content}>{this.renderContent()}</View>
          </View>
        </View>
      )
    }
  }
)
