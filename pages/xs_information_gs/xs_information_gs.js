// pages/xg_information_gs/xg_information_gs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company: '',
    company_id: '',
    tishi: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options.company_id)
    var that = this;
    that.setData({
      company_id: options.company_id
    })
    console.log(that.data.company_id)
    if (options.status == 1) {
      that.setData({
        tishi: '公司信息正在审核，请耐心等待！'
      })
    } else {
      that.setData({
        tishi: '公司信息已经审核通过，请到后台发布活动'
      })
    }

    wx.request({
      url: 'https://yq.51data.com.cn/api/v1/mation/comps',
      method: 'post',
      //data: { comp_id: options.company_id},
      data: { user_id: wx.getStorageSync('user_id'), comp_id: options.company_id },
      success: function (res) {
        console.log(res.data);
        that.setData({
          company: res.data.data,
        })
        /* wx.showModal({
           title: '提示',
           content: '公司信息已经审核通过，请到后台发布活动',
           showCancel: false
         });*/
      }
    })

  },
  xiugai: function () {
    wx.navigateTo({
      url: '../xg_information_gs/xg_information_gs?company_id=' + this.data.company_id,
    })
  }
})