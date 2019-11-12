// pages/list/list.js
Page({
  data: {
    inputShowed: false,
    inputVal:'',
    event: {},
    page: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      inputVal:options.title
    })
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/personal/participate',
      method: 'POST',
      data: { wechat_id: wx.getStorageSync('wechat_id'), page: that.data.page, pageSize: 2,title: that.data.inputVal },
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          event: res.data.data
        });
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    that.data.page += 1;
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/personal/participate',
      method: 'POST',
      data: { eventid: that.data.eventid, page: that.data.page, pageSize: 2, title: that.data.inputVal},
      success: (res) => {
        console.log(res.data.data)
        var event = that.data.event.concat(res.data.data);
        this.setData({
          event: event 
        });
        setTimeout(function(){
           wx.hideLoading();
        },1000);
      }
    })

  }
})