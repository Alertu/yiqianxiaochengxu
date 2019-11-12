Page({
  data: {
    inputShowed: false,
    inputVal: "",
    event:{},
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad: function () {
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/mation/participat',
      method: 'POST',
      data: { wechat_id: wx.getStorageSync('wechat_id')},
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          event: res.data.data
        });
      }
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/mation/participat',
      method: 'POST',
      data: { wechat_id: wx.getStorageSync('wechat_id') },
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          event: res.data.data
        });
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
});