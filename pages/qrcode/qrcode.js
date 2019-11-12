
// pages/qrcode/qrcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"",
    event:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.event_id);
    var that = this;
    /* , register_information_id: options.infor_id*/
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/event/details',
      method: 'POST',
      data: { eventid: options.event_id },
      success: (res) => {
        console.log(res.data.data)
        that.setData({
          event: res.data.data.event
        });
      }
    })
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/sign/sign-qrcode',
      method: 'POST',
      data: { eventid: options.event_id, wechat_id: wx.getStorageSync('wechat_id') },
      success: (res) => {
        console.log(res.data.data)
        that.setData({
          img: res.data.data.img_url
        });
      }
    })
  },
  shouye:function(){
    wx.switchTab({
      url: '../user/user',
    })
  }
})