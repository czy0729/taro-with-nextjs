/* eslint-disable react/destructuring-assignment */
/*
 * @Author: czy0729
 * @Date: 2019-12-31 19:37:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-16 17:03:58
 */
import React from 'react'
import { View } from '@tarojs/components'
import { observer, c, transform, loadScript } from '@/utils'
import { WX, MANIFEST } from '@/constants'
import { screenWidth, wind, pxRatio } from '@/constants/style'
import styles from './index.module.scss'

let loadedScript = false
let _num = 0

class ParserRichText extends React.Component {
  static defaultProps = {
    html: '',
    className: '',
    maxWidth: screenWidth - 2 * wind * pxRatio
  }

  constructor(props) {
    super(props)

    const { html } = props
    let __html = ''
    if (typeof html === 'string') {
      __html = this.replace(html)
    }

    this.state = {
      num: 0,
      __html
    }
  }

  async componentDidMount() {
    if (!loadedScript) {
      await loadScript(MANIFEST.lazyload)
      loadedScript = true
    }

    _num += 1
    this.setState(
      {
        num: _num
      },
      () => {
        setTimeout(() => {
          this.lazyload()
          this.addPreviewImage()
        }, 80)
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    const { html } = nextProps
    if (typeof html === 'string' && html !== this.props.html) {
      this.removePreviewImage()
      this.setState(
        {
          __html: this.replace(html)
        },
        () => {
          setTimeout(() => {
            this.lazyload()
            this.addPreviewImage()
          }, 80)
        }
      )
    }
  }

  componentWillUnmount() {
    this.removePreviewImage()
  }

  /**
   * 优化富文本字符串
   * @param {*} html
   */
  replace = html => {
    const { maxWidth } = this.props
    try {
      const __html = String(html)
        // 去掉富文本里面空行
        .replace(
          /<p>\n\t&nbsp;\n<\/p>|<p style="text-align:center;">\n\t&nbsp;\n<\/p>/g,
          ''
        )
        // 优化iframe的style
        .replace(
          /(<iframe [^>]*)width:(\d+px);height:(\d+px)([^>]*>)/g,
          (match, acc, w, h, ped) => {
            let _w = parseInt(w.replace('px', ''))
            let _h = parseInt(h.replace('px', ''))
            if (_w > maxWidth) {
              _h = parseInt((maxWidth / _w) * _h)
              _w = maxWidth
            }
            return `${acc}width:${transform(_w)}px;height:${transform(
              _h
            )}px${ped}`
          }
        )
        // 图片替换成懒加载模式
        .replace(/(<img [^>]*>)/g, match =>
          match.replace(
            'src="',
            'class="lazy" onload="javascript:this.classList.add(\'lazy-loaded\');this.removeAttribute(\'onload\')" data-src="'
          )
        )
        .replace(/\n+|(\r\n)+/g, '\n')
        .replace(/\n/g, '<br />')
      return __html
    } catch (error) {
      return html
    }
  }

  /**
   * 图片初始化懒加载
   */
  lazyload = () => {
    window.lazyload(
      document.querySelectorAll(`.${this.uniqueClassName} img[data-src]`),
      {
        root: null,
        rootMargin: '800px',
        threshold: 1
      }
    )
  }

  addPreviewImage = () => {
    document
      .querySelectorAll(`.${this.uniqueClassName} img[data-src]`)
      .forEach(node => {
        node.addEventListener('click', this.onImgClick)
      })
  }

  removePreviewImage = () => {
    document
      .querySelectorAll(`.${this.uniqueClassName} img[data-src]`)
      .forEach(node => {
        node.removeEventListener('click', this.onImgClick)
      })
  }

  onImgClick = e => {
    const current = e.currentTarget.dataset.src
    if (WX) {
      window.wx.previewImage({
        urls: this.getImgs(),
        current
      })
    }

    // else {
    //   Taro.previewImage({
    //     urls: this.getImgs(),
    //     current
    //   })
    // }
  }

  /**
   * 获取当前html里面所有图片src
   */
  getImgs = () => {
    const { __html } = this.state
    const imgs = []
    __html.replace(/<img.*?data-src="(.*?)".*?>/g, (match, src) => {
      imgs.push(src)
      return ''
    })
    return imgs
  }

  get uniqueClassName() {
    const { num } = this.state
    return `${styles.parseRichText}${num}`
  }

  render() {
    const { className } = this.props
    const { __html } = this.state
    return (
      <View
        className={c(styles.parseRichText, className, this.uniqueClassName)}
        dangerouslySetInnerHTML={{ __html }}
      />
    )
  }
}

export default observer(ParserRichText)
