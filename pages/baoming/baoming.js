// pages/baoming/baoming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    radioItems: [
      { name: '女', value: '0' },
      { name: '男', value: '1', checked: true }
    ],
    event:{},
    eventid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.eventid);
    //options.eventid=56;
    this.setData({
      eventid: options.eventid
    })
    var that=this;
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/sign/index',
      method: 'POST',
      data: { eventid: options.eventid},
      success: (res) => {
        console.log(res.data.data)
        that.setData({
          event: res.data.data
        });
      }
    });
    /*wx.request({
      url: 'https://yq.51data.com.cn/api/v1/mation/share-it ',
      method: 'POST',
      data: { eventid: options.eventid, wechat_id: wx.getStorageSync('wechat_id') },
      success: (res) => {
        console.log(res.data.data)
      }
    })*/
  },
  formSubmit(e) {
    var that = this;
    console.log(e.detail.value);
    var warn='';
    for (var index in e.detail.value) {
      var str='';
      if (e.detail.value[index]==''){
        if(index=='user_name'){
           str ='姓名';
        } else if (index == 'user_phone'){
           str = '手机号';
        }else{
          for (var key in that.data.event) {
            if (that.data.event[key]['Field'] == index) {
              if (that.data.event[key]['fill']==1){
                str = that.data.event[key]['type'];
              } 
            }
          }
        }  
        if(str!=''){
          warn = '请输入' + str;
          wx.showModal({
            title: '提示',
            content: warn,
            showCancel: false
          })
          break;   
        }
      }
    }
    if(warn==''){
      wx.showLoading({
        title: '数据提交中...',
      })
      wx.request({
        url: 'https://yq.51data.com.cn/api/v1/sign/create',
        method: 'POST',
        data: { eventid: e.detail.value.eventid, wechat_id: wx.getStorageSync('wechat_id'), information: e.detail.value, user_name: e.detail.value.user_name, user_phone: e.detail.value.user_phone},
        success: (res) => {
          wx.hideLoading();
          console.log(res.data)
          if (res.data.errcode == 2) {
            wx.showToast({
              title: '您已经报过名！',
              icon: 'success',
              duration:1500,
              success: function () {
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../qrcode/qrcode?event_id=' + res.data.data.event_id,
                  })
                }, 1500);  
              }
            })

          } else if (res.data.errcode == 1) {
            wx.showToast({
              title: '报名成功！',
              icon: 'success',
              duration: 1500,
              success: function () {
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../qrcode/qrcode?event_id=' + res.data.data.event_id,
                  })
                }, 1500);
              }
            })
          }
          else if (res.data.errcode == 0) { 
            wx.showModal({
              title: '提示',
              content: '报名人数已超出活动设置的规模，暂不能报名',
              showCancel:false
            })
          }
        }
      })
    }
  
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
  
  }
})