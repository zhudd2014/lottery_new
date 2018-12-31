//index.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime'
const app = getApp()

Page({
  data: {
    userInfo: app.globalData.userInfo,
    requestResult: '',
    inited: true,
    isEmpty: false,
    imageStyle: "border-radius: 4px 4px 0px 0px;width: 100%; height: " + app.globalData.windowWidth / 2 + "px;",
    lotteries: []
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    this.onGetOpenid()

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onShow: async function() {
    let lotteries = await this.getLotteries()
    this.setData({
      lotteries: lotteries
    })
  },
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        wx.setStorageSync('openid', res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        
      }
    })
  },
  goToLottery: function(e) {
    let prize = this.data.lotteries[e.currentTarget.dataset.index];
    console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../prize/prize?prize=' + JSON.stringify(prize)
    })
  },
  getLotteries: async function() {
    const db = wx.cloud.database()
    let lotteries = await db.collection('lotteries').get().then(res => {
      console.log(res.data)
      return res.data
    })
    return lotteries
  },
  getUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo == undefined) {
      wx.showToast({
        title: '授权才能抽奖哦',
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    wx.setStorageSync('userInfo', JSON.stringify(e.detail.userInfo))
    this.setData({
      userInfo: e.detail.userInfo
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      // title: app.globalData.userInfo.nickName + '在又见等你，一起去遇见自己',
      path: '/pages/index/index',
      // imageUrl: 'https://res-mindfullness-vigour-wechat.deepbaysz.com/images/share_pic.png',
      success: function (res) {

      }
    }
  }
})