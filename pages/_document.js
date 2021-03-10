/*
 * @Author: czy0729
 * @Date: 2021-02-24 20:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-26 23:22:07
 */
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='zh-CN'>
        <title>云知光</title>
        <meta name='keywords' content='云知光,照明展,智能照明展' />
        <meta name='description' content='' />
        <link
          rel='stylesheet'
          href='//at.alicdn.com/t/font_1242083_54ipu2m7x8c.css'
        />
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src='/js/init.js' />
        </body>
      </Html>
    )
  }
}

export default MyDocument
