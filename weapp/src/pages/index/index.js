/*
 * @Author: czy0729
 * @Date: 2021-02-24 16:01:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-10 17:21:29
 */
import React from 'react'
import { View } from '@tarojs/components'
import HomeHeader from '@/components/app/home-header'
import { observer } from '@/utils'
import { contentStore } from '@/stores'
import List from './list'

export async function getStaticProps() {
  return contentStore.fetchHomeList({}, true)
}

export default observer(
  class Index extends React.Component {
    contentStore = contentStore

    state = {
      loading: false
    }

    componentDidMount() {
      const { _loaded } = this.$list
      if (!_loaded) {
        this.fetchList(true)
      }
    }

    fetchList = async refresh => {
      this.setState({
        loading: true
      })

      await this.contentStore.fetchHomeList({}, refresh)

      this.setState({
        loading: false
      })
    }

    onPullDownRefresh = async rest => {
      await this.fetchList(true)
      setTimeout(() => {
        rest()
      }, 120)
    }

    onScrollToLower = async () => {
      const { loading } = this.state
      if (loading) return

      const { pagination } = this.$list

      if (pagination.page >= pagination.pageTotal) return

      this.fetchList()
    }

    get $list() {
      const { homeList } = this.contentStore.state
      return homeList
    }

    render() {
      const { loading } = this.state
      const { list } = this.$list
      return (
        <View>
          <HomeHeader />
          <List
            data={list}
            loading={loading}
            onPullDownRefresh={this.onPullDownRefresh}
            onScrollToLower={this.onScrollToLower}
          />
        </View>
      )
    }
  }
)
