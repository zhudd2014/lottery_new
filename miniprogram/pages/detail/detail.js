// miniprogram/pages/detail/detail.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    describe: '',
    openid: '',
    join_nums: 0,
    prize_pic: '',
    prize: '',
    prize_num: '',
    status: 0,
    queryResult: '',
    hasJoined: false,
    event_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    console.log('######options ', options)
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('lotteries').where({
      event_id: this.data.event_id,
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          title: res.data[0].title,
          describe: res.data[0].describe,
          prize_pic: res.data[0].prize_pic,
          prize_num: res.data[0].prize_num,
          status: res.data[0].status,
        })
        console.log('[数据库] [查询记录] 成功: ', res.data[0])
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

    /**
     * 此查询判断不准确
     */
    // 查询当前用户有无参加
    db.collection('event_joins').where({
      _openid: this.data.openid,
      event_id: this.data.event_id,
    }).get({
      success: res => {
        if (res.data.length > 0) {
          this.setData({
            hasJoined: true
          })
        }
        console.log('[数据库event_joins] [查询当前用户有无参加] 成功: ', res.data.length)

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

    // 查询参加总数
    db.collection('event_joins').where({
      event_id: this.data.event_id
    }).get({
      success: res => {
        if (res.data.length > 0) {
          this.setData({
            join_nums: res.data.length
          })
        }
        console.log('[数据库event_joins] [查询总用户数] 成功: ', res.data.length)

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 登记报名时，openid字段对不上，查询页查询不到
   */
  onAdd: function() {
    const updateNum = this.data.join_nums + 1;
    const db = wx.cloud.database()
    db.collection('event_joins').add({
      data: {
        event_id: this.data.event_id,
        touxiang_pic:'cloud://min520.6d69-min520/lottery/wx_tx_look.jpg',
        nick_name:'张一',
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          hasJoined: true,
          join_nums: updateNum
        })

        wx.showToast({
          title: '报名成功',
        })
        console.log('[数据库event_joins] [新增记录] 成功，记录 _id: ', open_id)


      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '报名成功，请勿重新报名'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
})