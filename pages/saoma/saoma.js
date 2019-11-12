// pages/saomao/saoma.js
Page({

  data: {
    operatorid: '',
    sign: '',
    signnumber:'',
    eventid: '',
    page:1,
    local:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      operatorid: options.operatorid,
      eventid: options.eventid,
      local: options.local
    })
    console.log(that.data.eventid)

    console.log(that.data.local)
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/event/scan-code',
      method: 'POST',
      data: { operator_id: that.data.operatorid, eventid: that.data.eventid, page: 1, pageSize: 20, local: that.data.local},
      success: (res) => {
        console.log(res.data.data)
        that.setData({
          sign: res.data.data.Signed,
          signnumber: res.data.data.sign_count,
        });
      }
    })
  },
  bindsaoma:function(){
    var that=this;
    wx.scanCode({
      success: (resa) => {
        if (resa.result) {
          wx.request({
            url: "https://yq.51data.com.cn/code/index",
            data: {
              type: 1, wechat_id: wx.getStorageSync('wechat_id'), eventid: that.data.eventid, code: resa.result
            },
            success: (res) => {
              console.log(res)
              if (res.data.eventid || res.data.reg_info_id) {
                wx.redirectTo({
                  url: "../operator-check/operator-check?event_id=" + res.data.eventid + '&infor_id=' + res.data.reg_info_id + '&operatorid=' + that.data.operatorid + '&wechat_id=' + wx.getStorageSync('wechat_id') + "&code=" + resa.result
                })
              } else {
                wx.showToast({
                  title: '您没权限查看',
                  duration: 2000,
                  success: function () {
                  }
                });
              }
            }
          })
        }

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
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    that.data.page += 1;
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/event/scan-code',
      method: 'POST',
      data: { operator_id: that.data.operatorid, eventid: that.data.eventid, page: that.data.page, pageSize: 20 },
      success: (res) => {
        console.log(res.data.data)
        var sign = that.data.sign.concat(res.data.data.Signed);
        that.setData({
          sign: sign,
          signnumber: res.data.data.sign_count,
        });
        setTimeout(function () {
          wx.hideLoading();
        }, 1000);
      }
    })

  }
})