/*
 * @Author: czy0729
 * @Date: 2020-04-14 16:50:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 15:37:06
 */
export const menuDS = [
  {
    icon: 'shop',
    name: '品牌主页',
    path: 'brand/detail',
    brand: true,
    getParams: domain => ({
      domain
    })
  },
  {
    icon: 'search',
    name: '品牌搜索',
    path: 'search',
    brand: true,
    getParams: domain => ({
      domain,
      type: 'case'
    })
  },
  {
    icon: 'star',
    name: '我的收藏',
    path: 'user',
    getParams: () => ({
      from: 'brand'
    })
  },
  {
    icon: '24-hour',
    name: '浏览记录',
    path: 'user/history',
    getParams: () => ({
      type: 'case'
    })
  },
  {
    icon: 'user',
    name: '个人中心',
    path: 'user',
    getParams: Function.prototype
  },
  {
    icon: 'home',
    name: '云知光首页',
    path: 'index',
    getParams: Function.prototype
  }
]
