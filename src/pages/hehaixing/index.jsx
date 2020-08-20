import Taro, {Component} from '@tarojs/taro'
import {Image, Text, View} from '@tarojs/components'
import { AtForm, AtButton, AtInput, AtIcon } from 'taro-ui'
import Fetch from '../../service/fetch'
// import walk from '../../assets/走路.png'
import './index.scss'

const walk = 'https://lake-circle.oss-cn-shenzhen.aliyuncs.com/12-1597512443.png'
const camera = 'https://lake-circle.oss-cn-shenzhen.aliyuncs.com/12-1597512949.png'



export default class Index extends Component {

  config = {
    navigationBarTitleText: '河海行',
    navigationBarBackgroundColor: '#1d4718',
    navigationBarTextStyle: 'white'
  }

  constructor() {
    super();
    this.state=({
      from: {},
      to: {},
      targetName: '',
      polyline: [],
      showLocation: false,
      distance: 0,
      list: [],
      id: 123123,
      intro: '',
      isUp: true,
      isTravel: false,
      hours: '0' + 0,   // 时
      minute: '0' + 0,   // 分
      second: '0' + 0,    // 秒,
      jifen: 0,
      jieshu: false,
      timer: undefined
    })
  }

  componentWillMount () {
  }


  changeTwoDecimal_f(x)
  {
    x = parseInt(x)
    console.log('啦啦啦啦啦' + x)
    var f_x = parseFloat(x);
    var f_x = Math.round(x*100)/100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0)
    {
      pos_decimal = s_x.length;
      s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2)
    {
      s_x += '0';
    }
    return s_x;
  }

  setInterval() {
    console.log('时钟开始了')
    const that = this
    var second = this.state.second
    var minute = this.state.minute
    var hours = this.state.hours
    let a= setInterval( ()=> {  // 设置定时器
      second++
      if(second % 10 == 0){
        var QQMapWX = require('../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk');
        var qqmapsdk = new QQMapWX({key: '244BZ-NF2AS-254OS-6JPUK-LK5G2-PKBO6'})
        qqmapsdk.search({
          keyword: this.state.targetName,
          success: (res) => {
            console.log(res)
            let dist123 = Math.round(res.data[0]._distance) / 100
            dist123 = dist123.toFixed(0)
            dist123 = (Math.round(this.state.distance) * 10).toFixed(0) - dist123
            console.log(dist123)
            this.setState({
               jifen: dist123
            })
          }})
      }
      if (second >= 60) {
        second = 0  //  大于等于60秒归零
        minute++
        if (minute >= 60) {
          minute = 0  //  大于等于60分归零
          hours++
          if (hours < 10) {
            // 少于10补零
            that.setState({
              hours: '0' + hours
            })
          } else {
            that.setState({
              hours: hours
            })
          }
        }
        if (minute < 10) {
          // 少于10补零
          that.setState({
            minute: '0' + minute
          })
        } else {
          that.setState({
            minute: minute
          })
        }
      }
      if (second < 10) {
        // 少于10补零
        that.setState({
          second: '0' + second
        })
      } else {
        that.setState({
          second: second
        })
      }
    }, 1000)
    this.setState({
      timer: a
    })
  }


  componentDidMount () {
    Taro.getLocation({
      type: 'wgs84',
      success: res=>{

        console.log(res)
        this.setState({
          from: {
            latitude: res.latitude,
            longitude: res.longitude,
          }
        })
      }
    })

    var QQMapWX = require('../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk');
    var qqmapsdk = new QQMapWX({key: '244BZ-NF2AS-254OS-6JPUK-LK5G2-PKBO6'})
    qqmapsdk.search({
      keyword: '鲩子湖',
      success: (res) => {
        console.log(res)
        let dist123 = Math.round(res.data[0]._distance) / 1000
        dist123 = dist123.toFixed(2)
          console.log(dist123)

        let to = {
          latitude: res.data[0].location.lat,
          longitude: res.data[0].location.lng,
        }
        this.setState({
          to: to,
          targetName: res.data[0].title,
          distance: dist123
        },()=>{
          Fetch(
            'api/v1/lake/intro/list',{
            },
            'GET'
          ).then(res => {
            console.log(res.data)
            for(let lake of res.data){
              if(lake.name == this.state.targetName){
                this.setState({
                  id: lake.id
                },()=>{
                  console.log(123123123)
                  Fetch(
                    'api/v1/lake/info/' + this.state.id,
                    {},
                    'GET'
                  ).then(res123 => {
                    console.log(res123)
                    this.setState({
                      intro: res123.data.introduction
                    })
                  })
                })
              }
            }
          })
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }}
    )


    // Promise.all([promise1,promise2]).then(data=>{
    //   console.log(data)
    //   let from = {
    //     latitude: data[0].latitude,
    //     longitude: data[0].longitude
    //   }
    //   let to = {
    //     latitude: data[1].location.lat,
    //     longitude: data[1].location.lng
    //   }
    //   let targetName = data[1].title
    //   qqmapsdk.direction({
    //     mode: 'walking',
    //     from: from,
    //     to: to,
    //     success: res => {
    //       console.log(res)
    //       var coors = res.result.routes[0].polyline, pl = [];
    //       //坐标解压（返回的点串坐标，通过前向差分进行压缩）
    //       var kr = 1000000;
    //       for (var i = 2; i < coors.length; i++) {
    //         coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
    //       }
    //       //将解压后的坐标放入点串数组pl中
    //       for (var i = 0; i < coors.length; i += 2) {
    //         pl.push({ latitude: coors[i], longitude: coors[i + 1] })
    //       }
    //       this.setState({
    //         from: from,
    //         to: to,
    //         showLocation: true,
    //         targetName: targetName,
    //         polyline: [{
    //           points: pl,
    //           color: '#FF0000DD',
    //           width: 4
    //         }]
    //       })
    //     }
    //   })
    // })
  }

  changeIs(){
    this.setState({
      isUp: !this.state.isUp
    })
  }

  abc(){
    if(this.state.jieshu == true){
      clearInterval(this.state.timer)
      this.setState({
        hours: 0,
        second: 0,
        minute: 0,
        jieshu: !this.state.jieshu
      })
      return
    }
    console.log(123)
    var QQMapWX = require('../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk');
    var qqmapsdk = new QQMapWX({key: '244BZ-NF2AS-254OS-6JPUK-LK5G2-PKBO6'})
    qqmapsdk.direction({
      mode: 'walking',
      from: this.state.from,
      to: this.state.to,
      success: res => {
        console.log(res)
        var coors = res.result.routes[0].polyline, pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        this.setState({
          isTravel: true,
          showLocation: true,
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 4
          }],
          jieshu: !this.state.jieshu
        })
      },
      fail: (res)=> {
        console.log(res)
      }
    })
    if(this.state.jieshu == false){
      this.setInterval()
    }
  }
  toQuest(){
    Taro.navigateTo({
      url: '/pages/uploadQuest/index'
    })
  }

  componentDidShow () {
  }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Image src={camera} className='camera' onClick={this.toQuest.bind(this)}></Image>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Map className="map" id='hehai123'  show-location={this.state.showLocation}  longitude={this.state.from.longitude} latitude={this.state.from.latitude} polyline={this.state.polyline}/>

        {this.state.isUp &&
      <View className="bottom" >
        <View className='bt' onClick={this.changeIs.bind(this)}>
          <AtIcon className="downjiantou" value='chevron-down' size='30' color='#F00'></AtIcon>
        </View>
        <View style='display: block;' className='e'>
          <View style='display: inline-block' className='a'>{this.state.targetName}</View>
          <View style='display: inline-block;background-color: #1d4718' className='b'></View>
          <View style='display: inline-block' className='c'>{this.state.intro}</View>
        </View>
        <AtButton onClick={this.abc.bind(this)}>{this.state.isTravel == false ? '开始游河行' : this.state.jieshu == true ? '结束' : '开始'}</AtButton>
        {
          this.state.isTravel &&
        <View className='bigTime'>
          <Image src={walk} className='z'></Image>
          <View className='x'>时间</View>
          <View className='cx'>距离(km)</View>
          <View className='v'>当前所获积分</View>
          <View className='clock'>{this.state.hours}:{this.state.minute}:{this.state.second}</View>
          <View className='dist'>{this.state.distance}</View>
          <View className="jifen">{this.state.jifen}</View>
        </View>
        }
        {/*<View>{this.state.distance}</View>*/}
      </View>
      }
        {!this.state.isUp&& <View className='btp' onClick={this.changeIs.bind(this)}>
          <AtIcon className="upjiantou" value='chevron-up' size='30' color='#F00'></AtIcon>
        </View>}
      </View>

    )
  }
}
