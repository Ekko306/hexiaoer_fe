import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/login/index',
      'pages/index/index',
      'pages/lakes/index',
      'pages/homepage/index',
      'pages/uploadQuest/index',
      'pages/hehaixing/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    permission: {

      "scope.userLocation": {

        desc: "你的位置信息将用于小程序位置接口的效果展示"

      }
    },
      tabBar: {
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: './assets/首页_line.png',
          selectedIconPath: './assets/首页_line.png'
        },
        {
          pagePath: 'pages/hehaixing/index',
          text: '行程',
          iconPath: './assets/行程-1.png',
          selectedIconPath: './assets/行程-1.png'
        },
        {
          pagePath: 'pages/lakes/index',
          text: '河湖圈',
          iconPath: './assets/河湖圈-1.png',
          selectedIconPath: './assets/河湖圈-1.png'
        },
        {
          pagePath: 'pages/homepage/index',
          text: '我的',
          iconPath: './assets/user.png',
          selectedIconPath: './assets/user.png'
        }
      ],
      color: '#CACACA',
      selectedColor: '#000000',
      backgroundColor: '#ffffff',
      borderStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
