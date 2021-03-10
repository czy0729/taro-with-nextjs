export default {
  pages: ['pages/index/index', 'pages/brand/index', 'pages/classroom/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '云知光',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#999999',
    selectedColor: '#e6211b',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './assets/tab-bar/home.png',
        selectedIconPath: './assets/tab-bar/home-active.png',
        text: '首页'
      },
      {
        pagePath: 'pages/classroom/index',
        iconPath: './assets/tab-bar/classroom.png',
        selectedIconPath: './assets/tab-bar/classroom-active.png',
        text: '微课堂'
      },
      {
        pagePath: 'pages/brand/index',
        iconPath: './assets/tab-bar/case.png',
        selectedIconPath: './assets/tab-bar/case-active.png',
        text: '案例'
      },
      {
        pagePath: 'pages/brand/index',
        iconPath: './assets/tab-bar/user.png',
        selectedIconPath: './assets/tab-bar/user-active.png',
        text: '我'
      }
    ]
  }
}
