/*
 * @Author: czy0729
 * @Date: 2019-07-30 16:40:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-10 14:55:01
 */
import * as Images from '@/constants/images'

export const listDS = [
  {
    pagePath: '/pages/index/index',
    iconPath: Images.imageTarBarHome,
    selectedIconPath: Images.imageTarBarHomeActive,
    text: '发现',
    selected: 0
  },
  {
    pagePath: '/pages/classroom/index',
    iconPath: Images.imageTarBarClassroom,
    selectedIconPath: Images.imageTarBarClassroomActive,
    text: '微课堂',
    selected: 1
  },
  {
    pagePath: 'add'
  },
  {
    pagePath: '/pages/tool/index',
    iconPath: Images.imageTarBarTool,
    selectedIconPath: Images.imageTarBarToolActive,
    text: '应用',
    selected: 2
  },
  {
    pagePath: '/pages/user/index',
    iconPath: Images.imageTarBarUser,
    selectedIconPath: Images.imageTarBarUserActive,
    text: '我',
    selected: 3
  }
]

export const menuDS = [
  {
    text: '图片',
    iconImg: Images.imageIconsImage,
    icon: 'picture',
    pagePath: 'publish/photos'
  },
  {
    text: '文章',
    iconImg: Images.imageIconsArticle,
    icon: 'document',
    pagePath: 'publish/article'
  },
  // {
  //   text: '视频',
  //   icon: 'video'
  // },
  {
    text: '案例',
    iconImg: Images.imageIconsCase,
    icon: 'plan',
    pagePath: 'publish/case'
  },
  {
    text: '产品',
    iconImg: Images.imageIconsProduct,
    icon: 'plan',
    pagePath: 'publish/item'
  }
]
