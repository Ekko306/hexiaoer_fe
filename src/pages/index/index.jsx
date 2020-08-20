import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtForm, AtButton, AtInput, AtIcon } from 'taro-ui'

import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor () {
    super(...arguments)
    this.state = {
      value: ''
    }
  }

  toUploadQuest (){
    console.log(123)
    Taro.navigateTo({
        url: '/pages/uploadQuest/index'
    })
  }
  toHehaixing (){
    console.log(123)
    Taro.switchTab({
      url: '/pages/hehaixing/index'
    })
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <AtIcon value='image' size='60' onClick={this.toUploadQuest.bind(this)}></AtIcon>

        <View className="lakes" onClick={this.toHehaixing.bind(this)}>河湖行</View>
      </View>
    )
  }
}
