Page({
  data: {
    inputShowed: false,
    inputVal: "",
    event:{}
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
    var that = this;
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/event/sign-count',
      method: 'POST',
      data: { user_id: wx.getStorageSync('user_id'), wechat_id: wx.getStorageSync('wechat_id') },
      success: (res) => {
        console.log(res.data.data)
        that.setData({
          event: res.data.data.event
        });
      }
    })
  }
});