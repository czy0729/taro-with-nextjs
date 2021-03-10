/*
 * @Author: czy0729
 * @Date: 2021-02-26 11:06:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2021-02-26 11:06:38
 */
export const initialProps = {
  lazy: false,
  distanceToRefresh: 50,
  damping: 150,
  isLoaded: true,
  isEmpty: false,
  emptyText: '',
  noMore: '', // 暂无更多内容
  footerLoadingText: '', // 加载中
  footerLoadedText: '', // 暂无更多内容
  scrollTop: 0,
  touchScrollTop: 0,
  onScrollToLower: () => {},
  className: '',
  onPullDownRefresh: null,
  hasMore: true,
  needInit: false,
  isError: false,
  launch: {},
  renderEmpty: null,
  renderError: null,
  indicator: {}
}

export const initialState = {
  canScrollY: true,
  touchScrollTop: 0,
  scrollTop: 0,
  startY: 0,
  downLoading: false,
  lowerLoading: false,
  needPullDown: true,
  isInit: false,
  blockStyle: {
    transform: 'translate3d(0,0,0)',
    transition: 'none'
  }
}
