// pages/operator-check/operator-check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   sign_id:'',
   eventid:'',
   info:'',
   operatorid:'',
   code:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
     this.setData({
       sign_id: options.infor_id,
       eventid: options.event_id,
       operatorid: options.operatorid,
       code: options.code
     })
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/sign/sign-code',
      method: 'POST',
      data: { eventid: that.data.eventid, code: that.data.code },
      success: (res) => {
        console.log(res.data)
        that.setData({
          info: res.data.data,
        });
        console.log(that.data.info)
      }
    })
  },
  bindcheck:function(){
    var that = this;
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/mation/sign',
      method: 'POST',
      data: { reg_info_id: that.data.sign_id, operator_id: that.data.operatorid },
      success: (res) => {
        console.log(res.data);
        if(res.data.errcode==1){
          wx.showToast({
            title: '签到成功',
            duration: 2000,
            success:function(){
              wx.redirectTo({
                url: '../saoma/saoma?operatorid=' + that.data.operatorid + '&eventid=' + that.data.eventid,
              })
            }
          });
        } else if (res.data.errcode == 2){
          wx.showModal({
            title: '提示',
            content: '您已签到',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../saoma/saoma?operatorid=' + that.data.operatorid + '&eventid=' + that.data.eventid,
                })
              }
            }
          })
        }
      }
    })
  }
  
})