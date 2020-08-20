import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtForm, AtButton, AtInput, AtCard } from 'taro-ui'
import background from '../../assets/1开屏.png'
import Fetch from '../../service/fetch'

import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor () {
    super(...arguments)
    this.state = {
      name: '',
      password: ''
    }
  }

  handleChangeName (name) {
    this.setState({
      name
    })
    return name
  }
  handleChangePassword (password) {
    this.setState({
      password
    })
    return password
  }
  onSubmit (event) {
    console.log(this.state.name)
    const {name, password} = this.state
    console.log(this.state.password)
    Fetch(
      'api/v1/login',{
        password: password,
        username: name
      },
      'POST'
    ).then(res => {
      console.log(res)
      if(res.code == 0){
        Taro.showToast({
          title: res.code
        })
        Taro.setStorage({
          key: 'token',
          data: res.data.token
        })
        Taro.setStorage({
          key: 'name',
          data: name
        })
        Taro.setStorage({
          key: 'password',
          data: password
        })
        Taro.switchTab({
          url: '/pages/index/index'
        });
      } else {
        Taro.showToast({
          icon: 'none',
          title: '账号或者密码错误'
        });
      }
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
        <Image src={background} className='background'></Image>
        <AtCard
          title='登陆'
          thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
          className='login'
        >
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
          >
            <AtInput
              name='value'
              title='账号'
              type='text'
              // placeholder='单行文本'
              value={this.state.name}
              onChange={this.handleChangeName.bind(this)}
            />
            <AtInput
              name='value'
              title='密码'
              type='password'
              // placeholder='单行文本'
              value={this.state.password}
              onChange={this.handleChangePassword.bind(this)}
            />
            <AtButton formType='submit' className='button1'>登陆</AtButton>
            <View className="textAll">
            <Text className='text1'>注册</Text>
            <Text className="text2">忘记密码</Text>
            </View>
          </AtForm>
        </AtCard>

      </View>
    )
  }
}
