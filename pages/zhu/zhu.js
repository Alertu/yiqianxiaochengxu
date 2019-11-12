// pages/zhu/zhu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindActivity_hascv: function () {
    var user_id = wx.getStorageSync('user_id');
    console.log(user_id);
    if (user_id == '') {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      wx.request({
        url: 'https://yq.51data.com.cn/api/v1/sign/compan',
        method: 'post',
        data: { user_id: user_id },
        success: function (res) {
          console.log(res.data);
          if (res.data.errcode == 0) {
            wx.navigateTo({
              url: '../information_gs/information_gs',
            })
          } else {
            wx.navigateTo({
              url: '../activity-has/activity-has',
            })
          }


        }
      })
    }
  },
  bindActivity_has(){
    wx.navigateTo({
      url: '../operator-sign-activity/operator-sign-activity',
    })
  },
  clear() {
    wx.removeStorageSync('user_id')
    wx.showToast({
      title: '退出成功',
      icon: 'none'
    })

  }
})