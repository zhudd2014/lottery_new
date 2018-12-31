// miniprogram/pages/users/users.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inited:true,
    count:0,
    users:[],
    userFlex: "flex: 0 0 10%;",
    event_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      event_id: options.event_id
    })
    // 查询参加总数
    wx.cloud.callFunction({
      name: 'getEventJoins',
      data: {
        event_id: this.data.event_id,
      },
      success: res => {
        console.log('[云函数getEventJoins调用] 成功: ', res.result)
        this.setData({
          count: res.result.event_joins_counts,
          users: res.result.event_joins.data
        })
        console.log('[云函数getEventJoins调用] 成功: ', res.result.event_joins.length)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [getEventJoins] 调用失败：', err)
      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})