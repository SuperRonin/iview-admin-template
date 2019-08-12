import Main from '@/components/main/main'

const routers = [
  // 首页
  {
    path: '/',
    name: '_home',
    redirect: "/home",
    component: Main,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home')
      }
    ]
  },
  // 小程序转H5
  {
    path: '/wx2H5',
    icon: 'ios-pricetag-outline',
    name: 'wx2H5',
    component: Main,
    children: [
      {
        path: 'css-trans',
        name: 'css-trans',
        icon: 'edit',
        component: () => import('@/pages/demo/css-trans')
      },
      {
        path: 'html-trans',
        name: 'html-trans',
        icon: 'edit',
        component: () => import('@/pages/demo/html-trans')
      }
    ]
  },
  // 文件地址生成
  {
    path: '/filecreation',
    icon: 'ios-pricetag-outline',
    name: 'filecreation',
    component: Main,
    children: [
      {
        path: 'file-address',
        name: 'file-address',
        icon: 'edit',
        component: () => import('@/pages/demo/filecreation')
      },
      // 下载文件
      {
        path: 'downloadfile-b',
        name: 'downloadfile-b',
        icon: 'edit',
        component: () => import('@/pages/demo/downloadfile')
      }
    ]
  },
  // 生成骨架屏页面
  {
    path: '/createpage',
    icon: 'ios-pricetag-outline',
    name: 'createpage',
    component: Main,
    children: [
      {
        path: 'createpage-demo',
        name: 'createpageDemo1',
        icon: 'edit',
        component: () => import('@/pages/demo/create-page')
      }
    ]
  },
  {
    path: '/login',
    icon: 'ios-pricetag-outline',
    name: 'login',
    component: () => import('@/pages/login/login'),
  }
]

export default routers