import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import { AtButton, AtTextarea, AtFloatLayout } from 'taro-ui'
import upload from '../../assets/upload.png'


import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super();
    this.state = ({
      inputValue: '',
      isShow: false,
      img: upload
    })
  }

  clickToPost(){
    console.log(123)
    this.setState({
      isShow: true
    })
  }

  handleClose(){
    this.setState({
      isShow: false
    })
  }

  chooseImg(){
    console.log(123)
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: (res)=>{
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        this.setState({
          img: tempFilePaths
        },()=>{
          this.upLoad()
            .then(url => {
            console.log(url)
          }).catch(error => {
            console.log(error)
          })
        })
      }
    })
  }

  upLoad(){
    console.log(12)
    return new Promise((resolve,reject) => {
      Taro.uploadFile({
        url: 'http://pinpin.muxixyz.com/api/v1/upload/image', //上传头像的服务器接口
        filePath: this.state.img[0],
        name: 'image',
        formData: {
          // image: this.state.file
        },
        header: {
          Authorization: 'Bearer ' + Taro.getStorageSync('token')
        },
        success: (res) => {
          console.log('你好')
          console.log(res)
          if (res.data) {
            resolve(JSON.parse(res.data).data.url);
          }
        },
        fail: (res) => {
          reject(res)
        }
      });
    });
  }

  photoImg(){
    console.log(456)
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: (res)=>{
        var tempFilePaths = res.tempFilePaths
        this.setState({
          img: tempFilePaths
        })
      }
    })
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange (inputValue) {
    this.setState({
      inputValue
    })
    return inputValue
  }

  render () {
    return (
      <View className='index'>
        <Image src={this.state.img} className="uploadImg" onClick={this.clickToPost.bind(this)}></Image>
        <AtTextarea
          value={this.state.inputValue}
          onChange={this.handleChange.bind(this)}
          maxLength={200}
          className="textarea"
          placeholder='你的问题是...'
        />
        <AtButton className="subButton">提交</AtButton>
        <AtFloatLayout isOpened={this.state.isShow} title="选择图片" onClose={this.handleClose.bind(this)}>
          <AtButton className="chooseImage" onClick={this.chooseImg.bind(this)}>从相册选择</AtButton>
          <AtButton className="photoImage" onClick={this.photoImg.bind(this)}>拍照上传</AtButton>
        </AtFloatLayout>
      </View>
    )
  }
}
