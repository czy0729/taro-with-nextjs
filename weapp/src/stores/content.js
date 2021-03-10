/*
 * @Author: czy0729
 * @Date: 2020-03-03 11:30:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-01 13:41:49
 */
import { observable, getTimestamp } from '@/utils'
import fetch from '@/utils/fetch'
import { LIST_EMPTY, LIST_LIMIT } from '@/constants'
import { API_CONTENT_FIND } from '@/constants/api'
import store from './common'

class Store extends store {
  namespace = 'contentStore'

  state = observable(
    this.ssr({
      /**
       * 首页数据
       */
      homeList: LIST_EMPTY
    })
  )

  /**
   * 首页数据
   */
  fetchHomeList = async (query, refresh) => {
    const key = 'homeList'
    const url = API_CONTENT_FIND

    const { list, pagination } = this.state[key]
    if (refresh || pagination.page < pagination.pageTotal) {
      const page = refresh ? 1 : pagination.page + 1
      const result = await fetch({
        url,
        data: {
          ...query,
          page,
          pagesize: LIST_LIMIT
        }
      })

      const { status, data } = result
      if (status === 0) {
        this.setState({
          [key]: {
            list: refresh ? data.rows : [...list, ...data.rows],
            pagination: {
              page,
              pageTotal: data.rows.length === LIST_LIMIT ? 100 : page
            },
            _loaded: getTimestamp()
          }
        })
      }
    }

    return this.toSSR({
      [key]: this.state[key]
    })
  }
}

export default new Store()
