// pages/activity-operator/activity-operator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   eventid:'',
   event:'',
   eventtltle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   this.setData({
     eventid:options.eventid,
     eventtitle: options.eventtitle
   })
    console.log(options.eventtitle)
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/mation/operator',
      method: 'POST',
      data: { eventid: options.eventid},
      success: (res) => {
        console.log(res.data.data)
        that.setData({
          event: res.data.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  binddelete:function(e){
    var that=this;
    var id = e.currentTarget.dataset.operatorid;
    console.log(id);
    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/mation/dele-operator',
      method: 'POST',
      data: { operator_id:id },
      success: (res) => {
        console.log(res.data.data)
        wx.showToast({
          title: '操作员删除成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            wx.request({
              url: 'https://yq.51data.com.cn/api/v1/mation/operator',
              method: 'POST',
              data: { eventid: that.data.eventid},
              success: (res) => {
                console.log(res.data.data)
                that.setData({
                  event: res.data.data
                });
              }
            })
          },
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.eventtitle,
      desc: '操作员填写资料',
      imgUrl: '../../img/0649.jpg', 
     // path: '/pages/user/user'
      path: '/pages/user/user?type=1&eventid=' + this.data.eventid //1代表添加操作员
    }
  }
})