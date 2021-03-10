/* eslint-disable */

!(function(x) {
  console.warn = function() {}

  function w() {
    var v,
      u,
      t,
      tes,
      s = x.document,
      r = s.documentElement,
      a = r.getBoundingClientRect().width
    if (!v && !u) {
      var n = !!x.navigator.appVersion.match(/AppleWebKit.*Mobile.*/)
      v = x.devicePixelRatio
      tes = x.devicePixelRatio
      ;(v = n ? v : 1), (u = 1 / v)
    }
    // if (a >= 750) {
    //   r.style.fontSize = '46.875px'
    // }
    if (a <= 320) {
      r.style.fontSize = '20px'
    } else {
      r.style.fontSize = (a / 320) * 20 + 'px'
    }
  }
  x.addEventListener('resize', function() {
    w()
  })
  w()

  if (window.location.hostname.indexOf('.com') !== -1) {
    var _hmt = _hmt || []
    ;(function() {
      var hm = document.createElement('script')
      hm.src = 'https://hm.baidu.com/hm.js?44a33b7e621cf614eb21bedb71bd50e2'
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  }
})(window)
