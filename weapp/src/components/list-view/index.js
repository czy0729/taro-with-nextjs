/* eslint-disable react/destructuring-assignment */
/*
 * @Author: czy0729
 * @Doc: https://github.com/Rahim-Chan/taro-listview
 * @Date: 2019-11-20 11:32:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-01 12:00:05
 */
import React from 'react'
import { ScrollView, View, Text } from '@tarojs/components'
import ActivityIndicator from '@/components/activity-indicator'
import { c } from '@/utils'
import { initialProps, initialState } from './ds'
import styles from './index.module.scss'

class ListView extends React.Component {
  static defaultProps = initialProps

  scrollView = {}

  state = initialState

  startY = 0

  componentDidMount() {
    this.trBody(0)
    if (this.props.needInit) this.fetchInit()
  }

  touchEvent = e => {
    const { type, touches } = e
    const { onPullDownRefresh, distanceToRefresh, damping } = this.props
    if (!onPullDownRefresh) return

    const { scrollTop } = this.state
    switch (type) {
      case 'touchstart': {
        this.setState({
          touchScrollTop: scrollTop,
          needPullDown: true
        })
        this.startY = touches[0].clientY
        break
      }
      case 'touchmove': {
        const { clientY } = touches[0]
        const { touchScrollTop } = this.state
        const height = Math.floor((clientY - this.startY) / 5)
        // 拖动方向不符合的不处理
        if (height < 0 || touchScrollTop > 5) return
        this.setState({ canScrollY: false })

        // e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
        if (height > 0 && height < (damping || 0)) {
          if (height < (distanceToRefresh || 0)) {
            this.setState({ needPullDown: true })
          } else {
            this.setState({ needPullDown: false })
          }
          this.trBody(height)
        }
        break
      }
      case 'touchend': {
        if (!this.state.needPullDown) {
          this.fetchInit()
        } else {
          this.resetLoad(0)
        }
        break
      }
      case 'touchcancel': {
        if (!this.state.needPullDown) {
          this.fetchInit()
        } else {
          this.resetLoad(0)
        }
        break
      }
      default: {
        // console.log('foo');
      }
    }
  }

  fetchInit = () => {
    const { onPullDownRefresh } = this.props
    this.resetLoad(1)
    if (onPullDownRefresh) {
      onPullDownRefresh(() => {
        this.setState({ isInit: true })
        this.resetLoad(0, () => {
          this.setState({ isInit: false })
        })
      })
    }
  }

  resetLoad = (status = 0, cb) => {
    // status: 0:回复初始值 1：加载中
    const { distanceToRefresh } = this.props
    let blockStyle = {
      transform: 'translate3d(0, 0, 0)',
      transition: 'all 160ms linear'
    }
    let state = {}
    switch (status) {
      case 0:
        state = {
          canScrollY: true,
          needPullDown: true,
          downLoading: false
        }
        break
      case 1:
        state = {
          canScrollY: false,
          needPullDown: false,
          downLoading: true
        }
        blockStyle = {
          transform: `translate3d(0,${distanceToRefresh}px,0)`,
          transition: 'all 160ms linear'
        }
        break
      default:
    }
    state = { ...state, blockStyle }
    this.setState(JSON.parse(JSON.stringify(state)))

    // todo 监听真正动画结束
    setTimeout(() => {
      if (cb) cb()
    }, 400)
  }

  handleScrollToLower = () => {
    debounce(() => {
      this.getMore()
    })()
  }

  getMore = () => {
    const { onScrollToLower } = this.props
    onScrollToLower()
  }

  onScroll = e => {
    const {
      detail: { scrollTop }
    } = e
    if (this.props.onScroll) this.props.onScroll(e)
    this.setState({ scrollTop })
  }

  trBody = y => {
    this.setState({
      blockStyle: {
        transform: `translate3d(0,${y}px,0)`,
        transition: 'none linear'
      }
    })
  }

  render() {
    const {
      style,
      tipFreedText,
      tipText,
      isEmpty,
      className,
      isError,
      indicator = {},
      damping,
      lowerThreshold,
      children
    } = this.props
    const { activate = '下拉刷新', deactivate = '释放刷新' } = indicator
    const {
      canScrollY,
      isInit,
      blockStyle,
      needPullDown,
      downLoading
    } = this.state

    const showTip = !downLoading && !isInit // 展示下拉区域文案
    const showChildren = !(isEmpty || isError) // 展示children内容
    const newStyle = {
      ...style,
      overflowY: canScrollY ? 'scroll' : 'hidden'
    }
    const trStyle = {
      ...blockStyle
    }
    // taro scrollView 组建scrollY无效
    const dampText = showTip
      ? needPullDown
        ? activate || tipText
        : deactivate || tipFreedText
      : ''

    return (
      <ScrollView
        // ref={node => (this.scrollView = node)}
        className={c(styles.scrollView, className)}
        style={newStyle}
        scrollY={canScrollY}
        lowerThreshold={lowerThreshold}
        scrollWithAnimation
        onScroll={this.onScroll}
        onScrollToLower={this.handleScrollToLower}
      >
        <View
          className={styles.container}
          onTouchMove={this.touchEvent}
          onTouchEnd={this.touchEvent}
          onTouchStart={this.touchEvent}
          onTouchCancel={this.touchEvent}
        >
          <View className={styles.bodyView} style={trStyle}>
            <View
              className={styles.pullDownBlock}
              style={{
                height: `${damping}px`,
                marginTop: `-${damping}px`
              }}
            >
              <View className={styles.tip}>
                <View className={styles.content}>
                  {downLoading ? (
                    <ActivityIndicator show size={28} />
                  ) : (
                    <Text className='t-24 l-24 t-extra'>{dampText}</Text>
                  )}
                </View>
              </View>
            </View>
            {showChildren && children}
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default ListView

function debounce(method, time = 500) {
  let timer = null
  return function () {
    const context = this
    // 在函数执行的时候先清除timer定时器;
    clearTimeout(timer)
    timer = setTimeout(() => {
      method.call(context)
    }, time)
  }
}
